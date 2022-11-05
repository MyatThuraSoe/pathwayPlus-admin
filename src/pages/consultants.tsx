import type { NextPage } from "next";
import Image from "next/image";

import Title from "../components/Title";

const Consultants: NextPage = () => {
  return (
    <div>
      <Title title="Consultants" />

      <div className="relative">
        <div className="relative md:w-20 md:h-20 w-10 h-10 ml-4">
          <Image src="/assets/logo-orange.png" layout="fill" alt="Pathway Plus Logo" />
        </div>
        <form className="flex flex-col px-8 pt-8">
          <h1 className="pl-2 py-1 text-lg border-l-4 border-primary">Work in progress</h1>
        </form>
      </div>
    </div>
  );
};

export default Consultants;
