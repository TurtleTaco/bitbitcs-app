// @ts-ignore
import { Server, Sheet } from "styletron-engine-atomic";
import { styletron } from "./styletron";
import { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import React from "react";

type Props = {
  stylesheets: Sheet[];
};

const MyDocument = ({ stylesheets }: Props) => {
  return (
    <Html>
      <Head>
        {stylesheets.map((sheet, i) => (
          <style
            key={i}
            className="_styletron_hydrate_"
            dangerouslySetInnerHTML={{ __html: sheet.css }}
            media={sheet.attrs.media}
            data-hydrate={sheet.attrs["data-hydrate"]}
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const page = await ctx.renderPage({
    // ... existing code ...
  });

  let stylesheets: Sheet[] = [];
  if (styletron instanceof Server) {
    stylesheets = styletron.getStylesheets() || [];
  }

  return { ...page, stylesheets };
};

export default MyDocument;
