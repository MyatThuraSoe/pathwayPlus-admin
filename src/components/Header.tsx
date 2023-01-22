import Image from "next/image";
import { getCookies, deleteCookie } from "cookies-next";
import { RiAccountCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  function toggleLogout() {
    setIsHovering((prevState) => !prevState);
  }

  function logout() {
    const cookies = getCookies();
    for (const cookie in cookies) {
      deleteCookie(cookie);
    }
    router.reload();
  }

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
      {isHovering ? <p onClick={logout} className="mr-4 text-xs md:text-base text-pink-red font-semibold cursor-pointer">Log Out</p> :<p className="mr-4 text-xs md:text-base">{user}</p>}
      <RiAccountCircleFill onClick={toggleLogout} className="mr-4 text-2xl text-primary cursor-pointer" />
    </nav>
  );
};

export default Header;
