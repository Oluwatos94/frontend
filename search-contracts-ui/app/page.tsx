'use client';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.length > 2) {
      search(newQuery);
    }
  };

  const search = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}`,
        { method: 'GET'}
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      const formattedResults = [
        ...data.token_names,
        ...data.token_symbols,
        ...data.admin_names,
        ...data.given_names,
        ...data.contracts
      ].map(item => ({
        hash: item.hash,
        alias: item.alias || undefined,
        verified: item.verified
      }));

      setResults(formattedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="bg-white/30 p-6 lg:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl max-h-screen w-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Search Starknet Smart Contracts</h2>
            <p className="text-sm text-gray-500 leading-5">
              Try by searching the protocol name, token or address.
            </p>
          </div>
        </div>
        <label className="input w-full">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="" placeholder="Search" value={query} onChange={handleChange} />
        </label>
        <ul className="list bg-base-100 rounded-box shadow-md overflow-auto max-h-[50vh] no-scrollbar">
          {results.length > 0 ? (
            results.map((item, index) => (
              <li key={index} className="list-row">
                <span className="font-semibold">{item.alias}</span> {item.hash} {item.verified && "✅"}
              </li>
            ))
          ) : (
            <li className="list-row p-2 text-gray-500">No results found</li>
          )}
        </ul>
      </div>
    </main>
  );
}
