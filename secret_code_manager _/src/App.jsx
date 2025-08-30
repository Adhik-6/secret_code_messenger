
import React, { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [encoded, setEncoded] = useState("");
  const [shareLink, setShareLink] = useState("");

  // Encode via backend
  const encodeMessage = async () => {
    if (!message.trim()) return;
    const res = await fetch("http://localhost:8080/api/encode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),  // send as JSON
    });
    const data = await res.json();
    setEncoded(data.encoded);
    setShareLink(`${window.location.origin}/decode?msg=${data.encoded}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">🔐 Secret Code Messenger</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your secret message..."
        className="w-full max-w-lg p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none mb-4"
      />

      <button
        onClick={encodeMessage}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg mb-6"
      >
        Encode & Share
      </button>

      {encoded && (
        <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Encoded Message:</h2>
          <p className="break-words mb-2">{encoded}</p>
          <button
            onClick={() => navigator.clipboard.writeText(encoded)}
            className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
          >
            Copy Encoded
          </button>
        </div>
      )}

      {shareLink && (
        <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Share Link:</h2>
          <a href={shareLink} className="text-blue-400 underline break-words">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
}
