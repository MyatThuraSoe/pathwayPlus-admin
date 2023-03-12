import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import moment from "moment";

import Title from "../../components/Title";
import useEvents from "../../hooks/useEvents";

const Events: NextPage = () => {
  const { loading, events, getEvents, deleteEvent, deleteLoading } = useEvents();
  const [selected, setSelected] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const eventsData = loading ? [] : events;

  useEffect(() => {
    getEvents();
  }, []);

  function cancel() {
    setShowConfirmation(false);
  }

  function confirmDelete(id: string) {
    setSelected(id);
    setShowConfirmation(true);
  }

  async function deleteAndRefresh() {
    await deleteEvent(selected);
    getEvents();
    setSelected("");
    setShowConfirmation(false);
  }

  return (
    <div className="p-4 px-4 md:px-20 max-w-3xl">
      <Title title="Events" />

      <div className="flex gap-x-4 mb-2">
        <h1 className="flex flex-1">Upcoming events</h1>
        <Link href="/events/new">
          <p className="text-primary cursor-pointer">
            <span className="align-middle text-xl">+</span>
            {" "}
            Create New Event
          </p>
        </Link>
      </div>

      <div className="overflow-y-scroll">
        {eventsData.map((event) => (
          <EventCard key={event._id} event={event} confirmDelete={confirmDelete} />
        ))}
      </div>

      {showConfirmation && <div className="fixed z-40 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white/70">
        <div className="z-50 px-8 py-5 w-96 bg-white rounded-md shadow-default">
          <p className="mb-3 text-pink-red font-semibold">Delete Event</p>
          <p className="mb-6">Are you sure you want to delete this event?</p>
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

const EventCard = ({ event, confirmDelete }: { event: AvailableEvent, confirmDelete:(id: string) => void }) => {
  const date = moment(event.createdAt).format("Do MMMM YYYY");
  function onDelete() {
    confirmDelete(event._id);
  }

  return (
    <div className="flex items-center mb-4 border-b-2">
      <div className="flex flex-col md:flex-row flex-1 p-2 mr-2">
        <Image src="/assets/logo-orange.png" width={100} height={100} layout="fixed" />
        <div className="flex flex-col justify-center">
          <p className="text-slate-500">{event.name}</p>
          <p className="text-slate-500 text-xs">
            Event Date:
            {" "}
            {date}
          </p>
        </div>
      </div>
      <p onClick={onDelete} className="flex text-pink-red cursor-pointer">
        <BiTrash className="mr-2" />
        <span className="text-xs underline">Delete</span>
      </p>
    </div>
  );
};

export default Events;
