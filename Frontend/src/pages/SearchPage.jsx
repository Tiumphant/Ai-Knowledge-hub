import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/api/docs/search?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Search Docs</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map(doc => (
          <li key={doc._id}>
            {doc.title}: {doc.content.slice(0, 50)}...
          </li>
        ))}
      </ul>
    </div>
  );
}
