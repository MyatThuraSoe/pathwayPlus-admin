import type { NextPage } from "next";
import Image from "next/image";
import Title from "../components/Title";

const Login: NextPage = () => {
  return (
    <div>
      <Title title="Login" />

      <div className="relative">
        <div className="relative md:w-20 md:h-20 w-10 h-10 ml-4">
          <Image src="/assets/logo-orange.png" layout="fill" alt="Pathway Plus Logo" />
        </div>
        <form className="flex flex-col px-8 pt-8">
          <h1 className="pl-2 py-1 text-lg border-l-4 border-primary">Log In</h1>
          
          <label htmlFor="email" className="first-of-type:mt-8 pt-4">Email Address</label>
          <input id="email" placeholder="Enter your email address" className="md:w-[600px] mt-1 p-2 border-2 rounded-md" />

          <label htmlFor="password" className="first-of-type:mt-10 pt-4">Password</label>
          <input id="password" placeholder="Enter your password" className="md:w-[600px] mt-1 p-2 border-2 rounded-md" />

          <button className="self-start mt-8 p-2 md:w-96 w-full bg-primary text-white rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
