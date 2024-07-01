import { SpeedInsights } from "@vercel/speed-insights/next";
import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (

    <Html lang="en">
      <SpeedInsights />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>

  );
}
