import Layout from "@/components/Layout";
import "@/styles/globals.css";
import {
  NinetailedProvider,
  NinetailedSsrPlugin,
} from "@ninetailed/experience.js-next";
import { NinetailedInsightsPlugin } from "@ninetailed/experience.js-plugin-insights";
import { NinetailedPreviewPlugin } from "@ninetailed/experience.js-plugin-preview";
import { useMemo } from "react";

// Opt in explicitly, never just "in development".
//
// The preview plugin registers an experience-selection middleware that runs
// after selection and overrides the result. When nothing has been force-picked
// in the widget its experienceVariantIndexes is empty, so it finds no match and
// rewrites the outcome to {experience: null, variant: baseline, variantIndex: 0}
// — suppressing every personalization while leaving isPersonalized true. Useful
// when you are deliberately previewing an audience, actively misleading when you
// are trying to see the real thing.
const isPreviewEnabled = process.env.NEXT_PUBLIC_NINETAILED_PREVIEW === "true";

// Stable empty defaults. Inline literals would give the useMemo below a new
// dependency identity on every render, which would rebuild the plugins and tear
// down the Ninetailed instance with them.
const NO_EXPERIENCES = [];
const NO_AUDIENCES = [];

export default function App({ Component, pageProps }) {
  const experiences = pageProps.ninetailedExperiences ?? NO_EXPERIENCES;
  const audiences = pageProps.ninetailedAudiences ?? NO_AUDIENCES;

  const plugins = useMemo(() => {
    // Keeps the same visitor across reloads. On init it reads the `ntaid` cookie
    // into storage as the anonymous id; on every profile change it writes the
    // profile id back out, 365 days by default.
    //
    // Without it each load mints a fresh profile, so profile.stableId changes
    // every visit — and the traffic and distribution hashes are derived from
    // stableId (`traffic-${experience.id}-${profile.stableId}`), so assignment
    // is re-rolled on every page view. Harmless for audience personalizations,
    // fatal for an experiment: the same person lands in a different bucket each
    // time and the results mean nothing.
    const enabled = [new NinetailedSsrPlugin(), new NinetailedInsightsPlugin()];

    if (isPreviewEnabled) {
      enabled.push(new NinetailedPreviewPlugin({ experiences, audiences }));
    }

    return enabled;
  }, [experiences, audiences]);

  return (
    <NinetailedProvider
      clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID}
      environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT}
      plugins={plugins}
      componentViewTrackingThreshold={2000}
      // Deliberately NOT useSDKEvaluation. Assignment comes from the Experience
      // API, which returns a selection per qualifying experience and records the
      // nt_experiment_<id> enrolment traits that experiment reporting is built
      // on. The SDK path skips those, so Insights cannot attribute conversions.
      //
      // This was temporarily on because the API had not yet synced the freshly
      // published experiences and returned nothing to match against. It has
      // since caught up.
      //
      // Both paths resolve the variant the same way — [baseline, ...variants]
      // indexed by variantIndex — and both honour the nt_experiences array order
      // on the baseline entry, so precedence is unchanged.
    >
      {/* Layout has no data fetching of its own, so the banner entry rides in
          on pageProps from each page's getStaticProps. */}
      <Layout banner={pageProps.banner}>
        <Component {...pageProps} />
      </Layout>
    </NinetailedProvider>
  );
}
