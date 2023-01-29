import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Title from "../../components/Title";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const CreateVacancy: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [src, setSrc] = useState("/assets/no_image.png");

  const editForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => setForm((oldForm) => {
    const newForm = JSON.parse(JSON.stringify(oldForm));
    if (typeof e === "string") {
      newForm["requirement"] = e;
    } else {
      const field = e.target.id;
      newForm[field] = e.target.value;
    }
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

  return (
    <div className="mb-10 p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Vacancies" />

      <div className="flex flex-col md:flex-row">

        <AiOutlineArrowLeft onClick={router.back} className="mr-5 mb-4 text-xl cursor-pointer text-primary" />

        <div className="flex flex-col w-full">
          <h1 className="mb-3">Create new opening</h1>

          <form className="relative flex flex-col">
            <div className="flex flex-col mb-6 max-w-max">
              <Image layout="fixed" height={220} width={320} src={src} className="rounded-lg" />
              <label htmlFor="img" className="text-blue text-sm text-right cursor-pointer">Choose image</label>
              <input required type="file" id="img" name="img" accept="image/*" onChange={saveImage} className="hidden" />
            </div>

            <label htmlFor="title" className="text-sm">Career Title</label>
            <input required id="title" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <label htmlFor="date" className="text-sm">Deadline Date</label>
            <input required id="date" type="date" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <label htmlFor="requirement" className="text-sm">Job Requirement</label>
            <ReactQuill id="requirement" onChange={editForm} className="flex flex-col md:w-[600px] h-40 mt-1 mb-4" />
            <label htmlFor="link" className="text-sm">Application Link</label>
            <input required id="link" type="url" placeholder="Google form link or email for applying position" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />

            <button className="w-32 py-3 rounded-lg text-white text-sm bg-primary-light hover:bg-primary transition-colors">
              Create
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default CreateVacancy;
