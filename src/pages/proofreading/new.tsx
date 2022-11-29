import type { NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

import Title from "../../components/Title";

interface InputProps {
  id: string;
  title: string;
  placeholder?: string;
  full?: boolean;
}

const CreateProofreader: NextPage = () => {
  const [tab, setTab] = useState<"Information" | "Sessions">("Information");
  const [form, setForm] = useState<Record<string, string>>({});
  const [src, setSrc] = useState("/assets/no_image.png");

  const editForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((oldForm) => {
    const field = e.target.id;
    const newForm = JSON.parse(JSON.stringify(oldForm));
    newForm[field] = e.target.value;
    return newForm;
  });

  const onQuillChange = (content: string) => setForm((oldForm) => {
    const newForm = JSON.parse(JSON.stringify(oldForm));
    newForm["biography"] = content;
    return newForm;
  });

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList !== null) {
      const file = fileList[0];
      const url = URL.createObjectURL(file);
      setSrc(url);
    }
  };

  const Input = ({ id, title, placeholder="", full=true }: InputProps) => (
    <div className="flex flex-col flex-1">
      <label htmlFor={id} className="text-sm">{title}</label>
      <input required id={id} placeholder={placeholder} defaultValue={form[id]} onChange={editForm} className={full ? "md:w-[600px] mt-1 mb-4 p-2 text-sm border-2 rounded-md" : "mt-1 mb-4 p-2 text-sm border-2 rounded-md"} />
    </div>
  );

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Consultants" />

      <h1 className="text-xs mb-3 md:text-base">Create a consultant</h1>

      <div className="flex mb-8 gap-x-6">
        <p onClick={() => setTab("Information")} className={`px-2 text-gray-400 cursor-pointer ${tab === "Information" && "text-black border-b-primary border-b-4"}`}>
          Information
        </p>
        <p onClick={() => setTab("Sessions")} className={`px-2 text-gray-400 cursor-pointer ${tab === "Sessions" && "text-black border-b-primary border-b-4"}`}>
          Sessions
        </p>
        <span className="flex flex-1" />
        {tab === "Sessions" && <button className="w-12 border-2 rounded-md border-primary text-primary">+</button>}
      </div>

      {tab === "Information"
        ? <div className="flex flex-col md:flex-row gap-x-10 gap-y-4">
          <div className="flex flex-col mb-6 max-w-max">
            <Image layout="fixed" height={150} width={150} src={src} />
            <label htmlFor="img" className="text-primary text-sm text-right cursor-pointer">Edit profile</label>
            <input required type="file" id="img" name="img" accept="image/*" onChange={saveImage} className="hidden" />
          </div>
          <form className="relative flex flex-col">
            <Input id="name" title="Proofreader name" placeholder="Enter name" />
            <Input id="email" title="Email Address" placeholder="Enter email address" />
            <Input id="university" title="University" placeholder="Enter university name" />
            <Input id="specialization" title="Specialization" placeholder="Enter specialization" />
            <div className="flex flex-col md:flex-row gap-x-2">
              <Input id="year" title="Year" placeholder="E.g. Final Year" full={false} />
              <Input id="country" title="Country" placeholder="Select Country" full={false} />
            </div>
            <label htmlFor="biography" className="text-sm">Bio</label>
            <ReactQuill id="biography" value={form["biography"]} onChange={onQuillChange} className="flex flex-col md:w-[600px] h-40 mt-1 mb-4" />
            <button className="self-end w-36 py-2 rounded-lg text-white text-sm bg-primary-light hover:bg-primary transition-colors">
              Create New
            </button>
          </form>
        </div>
        : <p className="text-gray-300">Work in progress</p>
      }

    </div>
  );
};

export default CreateProofreader;
