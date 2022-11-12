import Image from "next/image";
import { getCookies } from "cookies-next";
import { RiAccountCircleFill } from "react-icons/ri";

const Header: React.FC = () => {
  const { email } = getCookies();

  return (
    <nav className="flex items-center px-4">
      <div className="relative md:w-16 md:h-16 w-10 h-10">
        <Image src="/assets/logo-orange.png" layout="fill" alt="Pathway Plus Logo" />
      </div>
      <div className="flex-1" />
      <p className="mr-4 text-xs md:text-base">{decodeURIComponent(`${email}`)}</p>
      <RiAccountCircleFill className="mr-4 text-2xl text-primary" />
    </nav>
  );
};

export default Header;
