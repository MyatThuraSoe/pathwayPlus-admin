import { useRouter } from "next/router";
import Link from "next/link";

import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers, HiOutlineDocument } from "react-icons/hi";
import { TbCalendarTime, TbClipboardText } from "react-icons/tb";
import { RiSuitcaseLine } from "react-icons/ri";
import { IconType } from "react-icons";

interface NavButtonProps {
  title: string;
  IconType: IconType;
  path: string;
  currentPath: string;
}

const SideBar: React.FC = () => {
  const router = useRouter();
  const pathName = `/${router.asPath.split("/")[1]}`; // only first part of url

  return (
    <nav className="flex min-w-max flex-col py-8 gap-y-6 md:gap-y-3 border-r-2">
      <NavButton title="Consultants" IconType={FaRegUser} path="/consultants" currentPath={pathName} />
      <NavButton title="Proof-reading" IconType={HiOutlineDocument} path="/proofreading" currentPath={pathName} />
      <NavButton title="Events" IconType={TbCalendarTime} path="/events" currentPath={pathName} />
      <NavButton title="Vacancies" IconType={RiSuitcaseLine} path="/vacancies" currentPath={pathName} />
      <NavButton title="Volunteer List" IconType={HiOutlineUsers} path="/volunteers" currentPath={pathName} />
      <NavButton title="Appointments" IconType={TbClipboardText} path="/appointments" currentPath={pathName} />
    </nav>
  );
};

const NavButton = ({ title, IconType, path, currentPath }: NavButtonProps) => {
  const selected = path === currentPath;
  return (
    <Link href={selected ? {} : path}>
      <div className={`flex items-center px-3 md:pl-6 md: pr-12 py-1 gap-x-3 cursor-pointer text-gray-600 ${selected ? "!text-primary border-r-4 border-primary" : ""}`}>
        <IconType />
        <p className="md:flex hidden">{title}</p>
      </div>
    </Link>
  );
};

export default SideBar;
