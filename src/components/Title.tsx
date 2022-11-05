import Head from "next/head";

const Title = ({ title="Admin" }: { title?: string }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content="Pathway Plus Admin" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

export default Title;
