import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
