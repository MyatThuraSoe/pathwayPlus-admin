import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import useLogin from "../hooks/useLogin";

import Title from "../components/Title";

interface LoginFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { token } = req.cookies;
  if (token !== undefined && token !== "") {
    // redirect to consultants if logged in
    res.setHeader("location", "/consultants");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

const Login: NextPage = () => {
  const router = useRouter();
  const { loading, error, login } = useLogin();

  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.target as unknown as LoginFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const success = await login(email, password);
    if (success) {
      router.push("/consultants");
    }
  };

  return (
    <div>
      <Title title="Login" />

      <div className="relative md:w-20 md:h-20 w-10 h-10 ml-4">
        <Image src="/assets/logo-orange.png" layout="fill" alt="Pathway Plus Logo" />
      </div>

      <div className="relative flex">
        <form onSubmit={onLogin} className="flex flex-col flex-1 px-8 pt-8">
          <h1 className="pl-2 py-1 mb-8 text-lg border-l-4 border-primary">Log In</h1>

          <label htmlFor="email" className="mt-4 max-w-max">Email Address</label>
          <input required disabled={loading} id="email" placeholder="Enter your email address" className="md:w-[600px] mt-1 p-2 border-2 rounded-md" />

          <label htmlFor="password" className="mt-4 max-w-max">Password</label>
          <input required disabled={loading} id="password" placeholder="Enter your password" type="password" className="md:w-[600px] mt-1 p-2 border-2 rounded-md" />

          <p className="text-pink-red">{error}</p>

          <button disabled={loading} className={`self-start mt-8 p-2 md:w-96 w-full ${loading ? "bg-gray-200" :"bg-primary"} text-white rounded-md`}>Login</button>

          <p onClick={() => router.push("/reset")} className="mt-1 max-w-max hover:text-gray-300 underline cursor-pointer">Forgot Password</p>
        </form>

        <div className="relative hidden md:flex flex-1 ml-4">
          <Image src="/assets/login_pic.png" width={500} height={400} layout="fixed" alt="Picture of woman loggin in" />
        </div>
      </div>
    </div>
  );
};

export default Login;
