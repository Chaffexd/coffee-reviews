import { Html, Head, Main, NextScript } from "next/document";
import { resolveLocale } from "@/lib/locales";

export default function Document(props) {
  // This is responsible for actually updating the HTML lang in the html
  const currentLocale = resolveLocale(props.__NEXT_DATA__.locale);
  return (
    <Html lang={currentLocale} >
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
