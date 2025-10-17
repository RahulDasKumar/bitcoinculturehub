import { useState, useEffect } from "react";

export const useExploreData = (skip: number = 0, limit: number = 10) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ FastAPI backend endpoint
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

        // ✅ Backend pagination is optional, skip for now
        const res = await fetch(`${apiUrl}/explore`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        console.log("🔍 [useExploreData] API raw response:", json);
        setData(Array.isArray(json) ? json : json.data || []);
      } catch (err: any) {
        console.error("Error fetching explore data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skip, limit]); // These are now defined properly

  return { data, loading, error };
};
