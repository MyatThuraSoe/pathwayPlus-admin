import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";

import Title from "../../components/Title";
import useConsultants from "../../hooks/useConsultants";

const Consultants: NextPage = () => {
  const { loading, consultants, getConsultants } = useConsultants();
  const consultantsData = loading ? [] : consultants;

  useEffect(() => {
    getConsultants();
  }, []);

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Consultants" />

      <div className="flex gap-x-4 mb-4">
        <h1 className="flex flex-1 text-xs md:text-base">Number of consultants</h1>
        <button className="border-2 w-12 rounded-md border-black" disabled>{consultantsData.length}</button>
        <Link href="/consultants/new">
          <button className="border-2 w-12 rounded-md border-primary text-primary">+</button>
        </Link>
      </div>

      <div className="overflow-y-scroll">
        {consultantsData.map((consultant) => (
          <ConsultantCard key={consultant._id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

const ConsultantCard = ({ consultant }: { consultant:Consultant }) => {
  return (
    <div className="flex mb-4">
      <div className="flex flex-col md:flex-row flex-1 p-2 mr-2 border-2 rounded-md">
        <Image src="/assets/logo-orange.png" width={100} height={100} layout="fixed" />
        <div className="flex flex-col justify-between">
          <p className="font-semibold">{consultant.name}</p>
          <BulletPoint text={consultant.country} />
          <BulletPoint text={consultant.university} />
        </div>
      </div>
      <button className="flex items-center p-2 border-2 border-primary rounded-md">
        <BiTrash className="text-primary" />
      </button>
    </div>
  );
};

const BulletPoint = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <span className="w-2 h-2 mr-4 rounded-full bg-primary" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Consultants;
