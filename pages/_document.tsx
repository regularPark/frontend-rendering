import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <title>Stamp Crush</title>
      <meta
        name="description"
        content="흩어져있는 카페 쿠폰을 한 곳에서 관리하자."
      />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
