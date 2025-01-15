import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/scrape", { method: "POST" });
      if (!response.ok) throw new Error("Failed to fetch trends");
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button onClick={fetchTrends} disabled={loading}>
        {loading ? "Fetching..." : "Click here to run the script"}
      </button>
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>
            These are the most happening topics as on {data.date}.
          </h3>
          <ul>
            {Object.values(data.trends).map((trend, index) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
          <p>The IP address used for this query was {data.ip}.</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
