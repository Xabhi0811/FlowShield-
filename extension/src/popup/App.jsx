import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [blocked, setBlocked] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/sites", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBlocked(res.data))
    .catch(err => console.error(err));
  }, []);

  async function addBlock() {
    const origin = prompt("Enter site to block (e.g., facebook.com)");
    if (!origin) return;
    try {
      const res = await axios.post("http://localhost:5000/api/sites",
        { url: origin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlocked([...blocked, res.data]);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeBlock(id) {
    try {
      await axios.delete(`http://localhost:5000/api/sites/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlocked(blocked.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-4 w-80 min-h-[300px] bg-gray-950 text-gray-100 font-sans">
      {/* Header with glowing effect */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="mr-2 p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            FocusGuard
          </h1>
        </div>
        <span className="text-xs bg-gray-800/60 px-2.5 py-1 rounded-full border border-gray-700 font-medium text-gray-300">
          {blocked.length} blocked
        </span>
      </div>

      {/* Add Block Button with hover animation */}
      <div className="mb-6">
        <button 
          onClick={addBlock}
          className="w-full group relative overflow-hidden bg-gradient-to-br from-purple-600/90 to-blue-600/90 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center hover:shadow-purple-500/20"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Blocked Site
        </button>
      </div>

      {/* Blocked Sites List */}
      {blocked.length > 0 ? (
        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {blocked.map(b => (
            <li 
              key={b._id} 
              className="flex items-center justify-between bg-gray-900 hover:bg-gray-800/80 rounded-lg px-3 py-2.5 transition-all duration-200 border border-gray-800 hover:border-gray-700 shadow-sm"
            >
              <div className="flex items-center">
                <span className="relative flex h-2.5 w-2.5 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-sm font-medium truncate max-w-[180px] text-gray-200">
                  {b.url.replace(/^https?:\/\//, '')}
                </span>
              </div>
              <button
                onClick={() => removeBlock(b._id)}
                className="text-gray-400 hover:text-red-400 p-1 rounded-full transition-colors hover:bg-gray-700/50"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="mx-auto mb-4 p-4 w-16 h-16 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">No sites blocked yet</p>
          <p className="text-xs mt-1 text-gray-600">Add sites to boost your productivity</p>
        </div>
      )}

      {/* Footer with subtle glow */}
      <div className="mt-6 pt-4 border-t border-gray-800/60 text-xs text-gray-500 text-center relative">
        <div className="absolute -top-px left-1/2 w-16 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-x-1/2"></div>
        <p className="text-gray-400/80">Double-click extension icon to view stats</p>
      </div>
    </div>
  );
}