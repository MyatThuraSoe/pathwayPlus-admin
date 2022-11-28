import { useState } from "react";
import { objToQuery } from "../utils";

interface getEventsQueries {
  limit?: number;
  page?: number;
  name?: string;
  country?: string;
}

export default function useEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  async function getEvents(filters: getEventsQueries = {}) {
    setLoading(true);
    try {
      filters.limit = filters.limit ?? 6; // default limit is 6
      const queries = objToQuery(filters);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all?${queries}`, { method: "GET" });
      if (response.status < 200 || response.status >= 500) {
        setLoading(false);
        return false;
      }
      const responseData = await response.json();
      setEvents(responseData);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  return {
    loading,
    events,
    getEvents,
  };
}