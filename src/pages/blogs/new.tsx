import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Title from "../../components/Title";

const CreateBlog: NextPage = () => {
  const [form, setForm] = useState({});
  const [src, setSrc] = useState("/assets/no_image.png");

  const editForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((oldForm) => {
    const field = e.target.id;
    const newForm = JSON.parse(JSON.stringify(oldForm));
    newForm[field] = e.target.value;
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
      <Title title="Consultants" />

      <div className="flex flex-col md:flex-row">

        <Link href="/blogs">
          <AiOutlineArrowLeft className="mr-5 mb-4 text-xl cursor-pointer text-primary" />
        </Link>

        <div className="flex flex-col w-full">
          <h1 className="mb-3">Create Blog</h1>

          <form className="relative flex flex-col">
            <div className="flex flex-col mb-6 max-w-max">
              <Image layout="fixed" height={220} width={320} src={src} className="rounded-lg" />
              <label htmlFor="img" className="text-blue text-sm text-right cursor-pointer">Choose image</label>
              <input required type="file" id="img" name="img" accept="image/*" onChange={saveImage} className="hidden" />
            </div>

            <label htmlFor="title" className="text-sm">Blog Title*</label>
            <input required id="title" placeholder="Blog Title" onChange={editForm} className="w-full md:w-[600px] mt-1 mb-6 p-2 text-sm border-2 rounded-md" />
            <label htmlFor="description" className="text-sm">Description*</label>
            <textarea id="description" onChange={editForm} className="md:w-[600px] h-40 mt-1 mb-4 p-2 text-sm border-2 rounded-md" />

            <button className="w-36 py-2 rounded-lg text-white text-sm bg-primary-light hover:bg-primary transition-colors">
              Publish
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default CreateBlog;
