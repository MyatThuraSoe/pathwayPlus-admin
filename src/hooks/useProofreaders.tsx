import { useState } from "react";
import { objToQuery } from "../utils";

interface GetProofreadersQueries {
  limit?: number;
  page?: number;
  name?: string;
  country?: string;
}

export default function useProofreaders() {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [proofreaders, setProofreaders] = useState<Consultant[]>([]); // temporary type, replace later

  async function getProofreaders(filters: GetProofreadersQueries = {}) {
    setLoading(true);
    try {
      filters.limit = filters.limit ?? 6; // default limit is 6
      const queries = objToQuery(filters);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proofreaders/all?${queries}`, { method: "GET" });
      if (response.status < 200 || response.status >= 500) {
        setLoading(false);
        return false;
      }
      const responseData = await response.json();
      setProofreaders(responseData.proofreaders);
      setTotalPages(responseData.total);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  async function deleteProofreader(id: string) {
    setDeleteLoading(true);
    try {
      // authorisation not working; fix
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proofreaders/delete/${id}`, { method: "DELETE" });
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
    proofreaders,
    getProofreaders,
    deleteLoading,
    deleteProofreader,
  };
}