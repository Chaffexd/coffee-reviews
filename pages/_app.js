import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NinetailedProvider } from "@ninetailed/experience.js-next";
import { NinetailedInsightsPlugin } from "@ninetailed/experience.js-plugin-insights";
import { NinetailedPreviewPlugin } from "@ninetailed/experience.js-plugin-preview";
import { useMemo } from "react";

// The preview widget does not disable itself in production, so gate it here.
const isPreviewBuild = process.env.NODE_ENV !== "production";

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

    if (isPreviewBuild) {
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
