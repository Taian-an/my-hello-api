import { useEffect, useState } from 'react';

export default function TestApi() {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    // Make sure your Next.js server is running on localhost:3000
    fetch('http://localhost:3000/api/hello')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>API Connection Test</h1>
      {data ? (
        <h2 style={{ color: 'green' }}>{data.message}</h2>
      ) : (
        <p>Loading data from Next.js API...</p>
      )}
    </div>
  );
}