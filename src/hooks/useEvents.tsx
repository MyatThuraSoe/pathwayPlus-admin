import { useState } from "react";
import { objToQuery } from "../utils";

interface GetEventsQueries {
  limit?: number;
  page?: number;
  name?: string;
  country?: string;
}

export default function useEvents() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [events, setEvents] = useState<AvailableEvent[]>([]);

  async function getEvents(filters: GetEventsQueries = {}) {
    setLoading(true);
    try {
      filters.limit = filters.limit ?? 6; // default limit is 6
      const queries = objToQuery(filters);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/all?${queries}`, { method: "GET" });
      if (response.status < 200 || response.status >= 500) {
        setLoading(false);
        return false;
      }
      const responseData = await response.json();
      setEvents(responseData.events);
      setTotalPages(responseData.total);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  async function deleteEvent(id: string) {
    setDeleteLoading(true);
    try {
      // unfinshed: need to add authorization
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/delete/${id}`, { method: "DELETE" });
      if (response.status < 200 || response.status >= 500) {
        setDeleteLoading(false);
        return false;
      }
      const responseData = await response.json();
      setDeleteLoading(false);
      return true;
    } catch (e) {
      setDeleteLoading(false);
      return false;
    }
  }

  return {
    loading,
    totalPages,
    events,
    getEvents,
    deleteLoading,
    deleteEvent,
  };
}