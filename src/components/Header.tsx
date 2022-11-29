import Image from "next/image";
import { getCookies } from "cookies-next";
import { RiAccountCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const { email } = getCookies();
    setUser(decodeURIComponent(`${email}`));
  }, []);

  return (
    <nav className="flex items-center px-4">
      <div className="relative md:w-16 md:h-16 w-10 h-10">
        <Image src="/assets/logo-orange.png" layout="fill" alt="Pathway Plus Logo" />
      </div>
      <div className="flex-1" />
      <p className="mr-4 text-xs md:text-base">{user}</p>
      <RiAccountCircleFill className="mr-4 text-2xl text-primary" />
    </nav>
  );
};

export default Header;
