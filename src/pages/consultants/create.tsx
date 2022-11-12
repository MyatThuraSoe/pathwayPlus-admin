import type { NextPage } from "next";
import { AiOutlineUser } from "react-icons/ai";

import Title from "../../components/Title";

const CreateConsultants: NextPage = () => {

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Consultants" />

      <h1 className="mb-4 text-xs md:text-base">Create a consultant</h1>

      <div className="flex">
        <div>
          <AiOutlineUser className="h-28 w-28 bg-slate-300 text-white" />
          <p className="mt-1 text-right text-xs text-primary">Edit profile</p>
        </div>
      </div>

    </div>
  );
};

export default CreateConsultants;
