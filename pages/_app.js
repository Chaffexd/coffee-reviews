import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NinetailedProvider } from "@ninetailed/experience.js-next";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <NinetailedProvider
        clientId="84b3bf8f-867a-4648-88bb-a85d5ba448ef"
        >
        <Component {...pageProps} />
      </NinetailedProvider>
    </Layout>
  );
}
