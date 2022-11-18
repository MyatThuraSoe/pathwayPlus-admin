import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";

import moment from "moment";

import Title from "../../components/Title";
import useBlogs from "../../hooks/useBlogs";

const Blogs: NextPage = () => {
  const { loading, blogs, getBlogs } = useBlogs();
  const consultantsData = loading ? [] : blogs;

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Consultants" />

      <div className="flex gap-x-4 mb-2">
        <h1 className="flex flex-1">{`Total Blogs ( ${blogs.length} )`}</h1>
        <Link href="/blogs/new">
          <p className="text-primary cursor-pointer">
            <span className="align-middle text-xl">+</span>
            {" "}
            Create new blog
          </p>
        </Link>
      </div>

      <div className="overflow-y-scroll">
        {consultantsData.map((blog) => (
          <ConsultantCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

const ConsultantCard = ({ blog }: { blog: Blog }) => {
  const date = moment(blog.createdAt).format("Do MMMM YYYY");

  return (
    <div className="flex items-center mb-4 border-b-2">
      <div className="flex flex-col md:flex-row flex-1 p-2 mr-2">
        <Image src="/assets/logo-orange.png" width={100} height={100} layout="fixed" />
        <div className="flex flex-col justify-center">
          <p className="text-slate-500">{blog.title}</p>
          <p className="text-slate-500 text-xs">
            Publish Date:
            {" "}
            {date}
          </p>
        </div>
      </div>
      <p className="flex text-pink-red cursor-pointer">
        <BiTrash className="mr-2" />
        <span className="text-xs underline">Delete</span>
      </p>
    </div>
  );
};

export default Blogs;
