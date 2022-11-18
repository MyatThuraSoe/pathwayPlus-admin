import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { BiTrash, BiSearch, BiEdit } from "react-icons/bi";

import Title from "../../components/Title";
import useVolunteers from "../../hooks/useVolunteers";

const Volunteers: NextPage = () => {
  const { loading, volunteers, getVolunteers } = useVolunteers();
  const volunteersData = loading ? [] : volunteers;

  useEffect(() => {
    getVolunteers();
  }, []);

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Consultants" />

      <div className="flex gap-x-4 mb-2">
        <h1 className="flex flex-1">Volunteer List</h1>
        <Link href="/volunteers/new">
          <p className="text-primary cursor-pointer">
            <span className="align-middle text-xl">+</span>
            {" "}
            Add Volunteer
          </p>
        </Link>
      </div>

      <div className="flex items-center mb-4 p-2 max-w-md rounded-lg border-2">
        <BiSearch className="mx-2 text-primary text-2xl" />
        <input placeholder="Search Volunteer's name" className="w-full focus:outline-none" />
      </div>

      <div className="border-2 border-t-0 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="h-14 text-white">
              <td className="min-w-[15px] rounded-l-lg bg-primary"></td>
              <td className="pr-2 bg-primary">No.</td>
              <td className="pr-2 bg-primary">Volunteer Name</td>
              <td className="pr-2 bg-primary">Role</td>
              <td className="pr-2 bg-primary">Department</td>
              <td className="pr-2 bg-primary">Duration</td>
              <td className="pr-2 rounded-r-lg bg-primary">Actions</td>
            </tr>
          </thead>

          <tbody className="overflow-y-scroll">
            {volunteersData.map((volunteer, index) => (
              <VolunteerRow key={volunteer._id} index={index} volunteer={volunteer} />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

const VolunteerRow = ({ index, volunteer }: { index: number; volunteer: Volunteer }) => {
  return (
    <tr className="h-12 text-slate-600">
      <td></td>
      <td>{index + 1}</td>
      <td>{volunteer.name}</td>
      <td>{volunteer.role.name}</td>
      <td>{volunteer.department.name}</td>
      <td>{volunteer.duration}</td>
      <td>
        <div className="flex">
          <BiTrash className="text-pink-red mr-2" />
          <Link href={`/volunteers/${volunteer._id}/edit`}>
            <BiEdit className="text-blue cursor-pointer" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default Volunteers;
