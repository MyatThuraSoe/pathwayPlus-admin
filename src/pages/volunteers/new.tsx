import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Title from "../../components/Title";

const CreateVolunteer: NextPage = () => {
  const [form, setForm] = useState({});

  const editForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((oldForm) => {
    const field = e.target.id;
    const newForm = JSON.parse(JSON.stringify(oldForm));
    newForm[field] = e.target.value;
    return newForm;
  });

  return (
    <div className="mb-10 p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Consultants" />

      <div className="flex flex-col md:flex-row">

        <Link href="/volunteers">
          <AiOutlineArrowLeft className="mr-5 mb-4 text-xl cursor-pointer text-primary" />
        </Link>

        <div className="flex flex-col w-full">
          <h1 className="mb-3">Add Volunteer</h1>

          <form className="relative flex flex-col">
            <label htmlFor="name" className="text-sm">Name*</label>
            <input required id="name" placeholder="Volunteer Name" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <label htmlFor="role" className="text-sm">Role*</label>
            <input required id="role" placeholder="Volunteer's Role" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <label htmlFor="department" className="text-sm">Department*</label>
            <input required id="department" placeholder="Department" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <label htmlFor="duration" className="text-sm">Duration*</label>
            <input required id="duration" placeholder="00" type="number" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <button className="w-36 py-2 rounded-lg text-white text-sm bg-primary-light hover:bg-primary transition-colors">
              Add Volunteer
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default CreateVolunteer;
