import { useState } from "react";
import { objToQuery } from "../utils";

interface GetBlogsQueries {
  limit?: number;
  page?: number;
  name?: string;
  country?: string;
}

export default function useBlogs() {
  const [loading, setLoading] = useState(false);
  // const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  async function getBlogs(filters: GetBlogsQueries = {}) {
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
      setBlogs(responseData);
      // setTotalPages(responseData.totalPages);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return false;
    }
  }

  return {
    loading,
    // totalPages,
    blogs,
    getBlogs,
  };
}