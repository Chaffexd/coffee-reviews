import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  // This is responsible for actually updating the HTML lang in the html
  const currentLocale = props.__NEXT_DATA__.locale || "en-GB";
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
