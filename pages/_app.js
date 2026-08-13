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
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NinetailedProvider>
  );
}
