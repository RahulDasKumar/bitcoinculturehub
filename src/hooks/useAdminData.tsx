import { useState, useEffect } from "react";

export const useAdminData = (skip: number = 0, limit: number = 10) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ FastAPI backend endpoint
          const apiUrl = "https://bch-backend-7vjs.onrender.com";

        const res = await fetch(`${apiUrl}/explore`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        
        const dataArray = Array.isArray(json) ? json : json.data || [];

        const filteredData = dataArray.filter(entry => entry.accepted === false);

        console.log(filteredData);

        setData(filteredData);

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
