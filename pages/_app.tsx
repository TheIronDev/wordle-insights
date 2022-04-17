import '../styles/globals.css';
import React from 'react';
import type {AppProps} from 'next/app';
import LayoutComponent from '../components/layout';
import Head from 'next/head';

function MyApp({Component, pageProps}: AppProps) {
  const viewportMetadata = [
    'width=device-width',
    'initial-scale=1.0',
    'maximum-scale=1.0',
    'user-scalable=0',
  ].join(', ');

  return <LayoutComponent>
    <Head>
      <title>World Insights</title>
      <meta name="viewport" content={viewportMetadata} />
    </Head>
    <Component {...pageProps} />
  </LayoutComponent>;
}

export default MyApp;
