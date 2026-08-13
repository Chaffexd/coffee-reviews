import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NinetailedProvider } from "@ninetailed/experience.js-next";
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
    const enabled = [new NinetailedInsightsPlugin()];

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
      // Decide variants in the SDK from the experiences we already fetch out of
      // Contentful, matched against profile.audiences. The default (false)
      // instead waits for the Experience API to return a selection per
      // experience, so nothing personalizes until the CMS has synced to it —
      // audiences arrive quickly, experiences do not.
      //
      // Fine for personalizations, which are deterministic on audience. Revisit
      // when adding an A/B test: server-side assignment is what keeps traffic
      // bucketing and experiment reporting consistent across devices.
      useSDKEvaluation
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NinetailedProvider>
  );
}
