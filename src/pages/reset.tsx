import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import useLogin from "../hooks/useLogin";

import Title from "../components/Title";

const Reset: NextPage = () => {
  const router = useRouter();
  const { loading, error, login } = useLogin();

  return (
    <div>
      <Title title="Login" />

      <div className="relative md:w-20 md:h-20 w-10 h-10 ml-4">
        <Image src="/assets/logo-orange.png" layout="fill" alt="Pathway Plus Logo" />
      </div>

      <div className="relative flex">
        <form onSubmit={void(0)} className="flex flex-col flex-1 px-8 pt-8">
          <h1 onClick={router.back} className="pl-2 py-1 mb-8 text-lg border-l-4 border-primary underline cursor-pointer">Back to login</h1>

          <label htmlFor="email" className="mt-4 max-w-max">Email Address</label>
          <input required disabled={loading} id="email" placeholder="Enter your email address" className="md:w-[600px] mt-1 p-2 border-2 rounded-md" />

          {/* The two elements below are invisible. They are only used for positioning. */}
          <p className="opacity-0 mt-4">0</p>
          <input disabled className="opacity-0 mt-1 p-2 border-2 " />

          <p className="text-pink-red">{error}</p>

          <button disabled={loading} className={`self-start mt-8 p-2 md:w-96 w-full ${loading ? "bg-gray-200" :"bg-primary"} text-white rounded-md`}>Reset</button>

        </form>

        <div className="relative hidden md:flex flex-1 ml-4">
          <Image src="/assets/login_pic.png" width={500} height={400} layout="fixed" alt="Picture of woman loggin in" />
        </div>
      </div>
    </div>
  );
};

export default Reset;
