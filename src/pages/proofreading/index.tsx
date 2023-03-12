import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

import Title from "../../components/Title";
import useProofreaders from "../../hooks/useProofreaders";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Proofreading: NextPage = () => {
  const { loading, proofreaders, getProofreaders, deleteLoading, deleteProofreader } = useProofreaders();
  const [selected, setSelected] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const proofreadersData = loading ? [] : proofreaders;

  useEffect(() => {
    getProofreaders();
  }, []);

  function cancel() {
    setShowConfirmation(false);
  }

  function confirmDelete(id: string) {
    setSelected(id);
    setShowConfirmation(true);
  }

  async function deleteAndRefresh() {
    await deleteProofreader(selected);
    getProofreaders();
    setSelected("");
    setShowConfirmation(false);
  }

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Proofreading" />

      <div className="flex gap-x-4 mb-4">
        <h1 className="flex flex-1 text-xs md:text-base">Number of Proofreaders</h1>
        <button className="border-2 w-12 rounded-md border-black" disabled>{proofreadersData.length}</button>
        <Link href="/proofreading/new">
          <button className="border-2 w-12 rounded-md border-primary text-primary">+</button>
        </Link>
      </div>

      <div className="overflow-y-scroll">
        {proofreadersData.map((proofreader) => (
          <ProofreaderCard key={proofreader._id} proofreader={proofreader} confirmDelete={confirmDelete} />
        ))}
        {proofreadersData.length == 0 && !loading && <p>No proofreaders found</p>}
      </div>

      {showConfirmation && <div className="fixed z-40 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white/70">
        <div className="z-50 px-8 py-5 w-96 bg-white rounded-md shadow-default">
          <p className="mb-3 text-pink-red font-semibold">Delete Proofreader</p>
          <p className="mb-6">Are you sure you want to delete this proofreader?</p>
          <div className="flex justify-between gap-x-6">
            <p onClick={cancel} className="flex flex-1 justify-center items-center py-2 border-2 rounded-md cursor-pointer">Cancel</p>
            <p onClick={deleteAndRefresh} className="flex flex-1 justify-center items-center py-2 border-2 border-pink-red rounded-md cursor-pointer bg-pink-red text-white">
              {deleteLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Delete"}
            </p>
          </div>
        </div>
      </div>}
    </div>
  );
};

const ProofreaderCard = ({ proofreader, confirmDelete }: { proofreader:Consultant, confirmDelete:(id: string) => void }) => {
  function onDelete() {
    confirmDelete(proofreader._id);
  }

  return (
    <div className="flex mb-4">
      <div className="flex flex-col md:flex-row flex-1 p-2 mr-2 border-2 rounded-md">
        <Image src="/assets/logo-orange.png" width={100} height={100} layout="fixed" />
        <div className="flex flex-col justify-between">
          <p className="font-semibold">{proofreader.name}</p>
          <BulletPoint text={proofreader.country} />
          <BulletPoint text={proofreader.university} />
        </div>
      </div>
      <button onClick={onDelete} className="flex items-center p-2 border-2 border-primary rounded-md">
        <BiTrash className="text-primary" />
      </button>
    </div>
  );
};

const BulletPoint = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <span className="w-2 h-2 mr-4 rounded-full bg-primary" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Proofreading;
