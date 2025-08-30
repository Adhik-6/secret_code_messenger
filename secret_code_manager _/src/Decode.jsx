import { useState, useEffect } from "react";

export default function Decode() {
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg");
    if (msg) {
      setEncoded(msg);
      decodeMessage(msg);
    }
  }, []);

  const decodeMessage = async (encodedMsg) => {
    try {
      const res = await fetch("http://localhost:8080/api/decode", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: encodedMsg,
      });
      const text = await res.text();
      setDecoded(text);
    } catch (err) {
      setDecoded("Error decoding message.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">🔓 Secret Code Messenger — Decoder</h1>

      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Encoded Message:</h2>
        <p className="break-words mb-2">{encoded}</p>
      </div>

      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Decoded Message:</h2>
        <p className="break-words">{decoded}</p>
      </div>
    </div>
  );
}
