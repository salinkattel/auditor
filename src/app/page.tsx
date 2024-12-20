"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string | null>(null); // Store fetched data as a string

  async function fetchData() {
    try {
      const response = await fetch(
        "https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getsourcecode&address=0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82&apikey=R8NJ3N9SJ53FETA5PDC91UBZP6WQ95Z2JU"
      );
      const result = await response.json();
      let formatedstr = JSON.stringify(result.result[0].SourceCode);
      setData(formatedstr.replace(/\\n/g, "\n"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-lg font-bold mb-4">SMART CONTRACTS</h1>
      {data ? (
        <div
          dangerouslySetInnerHTML={{
            __html: data.replace(/\n/g, "<br>"),
          }}
          className="text-left whitespace-pre-wrap overflow-auto max-h-[70vh] w-full p-4 border border-gray-300 rounded bg-black-50"
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
