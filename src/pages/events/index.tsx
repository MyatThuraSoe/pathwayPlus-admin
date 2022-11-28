import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";

import moment from "moment";

import Title from "../../components/Title";
import useEvents from "../../hooks/useEvents";

const Events: NextPage = () => {
  const { loading, events, getEvents } = useEvents();
  const eventsData = loading ? [] : events;

  useEffect(() => {
    getEvents();
  }, []);

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
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const date = moment(event.createdAt).format("Do MMMM YYYY");

  return (
    <div className="flex items-center mb-4 border-b-2">
      <div className="flex flex-col md:flex-row flex-1 p-2 mr-2">
        <Image src="/assets/logo-orange.png" width={100} height={100} layout="fixed" />
        <div className="flex flex-col justify-center">
          <p className="text-slate-500">{event.title}</p>
          <p className="text-slate-500 text-xs">
            Publish Date:
            {" "}
            {date}
          </p>
        </div>
      </div>
      <p className="flex text-pink-red cursor-pointer">
        <BiTrash className="mr-2" />
        <span className="text-xs underline">Delete</span>
      </p>
    </div>
  );
};

export default Events;
