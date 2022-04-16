import React from 'react';
import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  const viewportMetadata = [
    'width=device-width',
    'initial-scale=1.0',
    'maximum-scale=1.0',
    'user-scalable=0',
  ].join(', ');

  return (
    <Html>
      <Head>
        <title>World Insights</title>
        <meta
          name="description"
          content="Wordle Insights - Wordle with an emphasis on data" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
        <meta name="viewport" content={viewportMetadata} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
