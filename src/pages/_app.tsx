import "../styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";
import { RouteGuard } from "../components/RouteGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouteGuard>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RouteGuard>
  );
}

export default MyApp;
