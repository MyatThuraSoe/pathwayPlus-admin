import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // redirect to login
  res.setHeader("location", "/login");
  res.statusCode = 302;
  res.end();

  return { props: {} };
};

const Index: NextPage = () => {
  return (
    <div />
  );
};

export default Index;