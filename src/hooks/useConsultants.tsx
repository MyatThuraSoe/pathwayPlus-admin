import { useState } from "react";
import { objToQuery } from "../utils";
import { getCookie } from "cookies-next";

interface GetConsultantsQueries {
  limit?: number;
  page?: number;
  name?: string;
  country?: string;
}

export default function useConsultants() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  async function getConsultants(filters: GetConsultantsQueries = {}) {
    setLoading(true);
    try {
      filters.limit = filters.limit ?? 6; // default limit is 6
      const queries = objToQuery(filters);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultants/all?${queries}`, { method: "GET" });
      if (response.status < 200 || response.status >= 500) {
        setLoading(false);
        return false;
      }
      const responseData = await response.json();
      setConsultants(responseData.consultants);
      setTotalPages(responseData.total);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  async function deleteConsultant(id: string) {
    setDeleteLoading(true);
    // authorisation not working; fix
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultants/delete/${id}`, { method: "DELETE" });
      if (response.status < 200 || response.status >= 500) {
        setDeleteLoading(false);
        return false;
      }
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
    consultants,
    getConsultants,
    deleteLoading,
    deleteConsultant,
  };
}