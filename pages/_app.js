import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NinetailedProvider } from "@ninetailed/experience.js-next";
import { NinetailedInsightsPlugin } from "@ninetailed/experience.js-plugin-insights";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <NinetailedProvider
        clientId="18412742-d1c0-4be8-8687-8f8d81cd2982"
        plugins={[new NinetailedInsightsPlugin()]}
        componentViewTrackingThreshold={2000}
      >
        <Component {...pageProps} />
      </NinetailedProvider>
    </Layout>
  );
}
