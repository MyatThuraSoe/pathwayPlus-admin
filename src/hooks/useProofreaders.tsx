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
  const [totalPages, setTotalPages] = useState(1);
  const [proofreaders, setProofreaders] = useState<Consultant[]>([]);

  async function getProofreaders(filters: GetProofreadersQueries = {}) {
    setLoading(true);
    try {
      filters.limit = filters.limit ?? 6; // default limit is 6
      const queries = objToQuery(filters);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultant/all?${queries}`, { method: "GET" });
      if (response.status < 200 || response.status >= 500) {
        setLoading(false);
        return false;
      }
      const responseData = await response.json();
      setProofreaders(responseData.data);
      setTotalPages(responseData.totalPages);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  return {
    loading,
    totalPages,
    proofreaders,
    getProofreaders,
  };
}