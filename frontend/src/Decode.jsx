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
      // console.log(res);
      const text = (await res.text()).split(":")[1];
      const trimmed = text.trim().slice(1, -2);
      // console.log(trimmed);
      setDecoded(trimmed || "Invalid message encoding.");
    } catch (err) {
      setDecoded("Error decoding message.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-12">🔓 Secret Code Messenger — Decoder</h1>

      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Encoded Message</h2> <hr />
        {/* <p className="">{encoded}</p> */}
        <input value={encoded} onChange={e => setEncoded(e.target.value)} type="text" className="break-words w-full outline-none text-xl mt-4" />
      </div>

      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Decoded Message</h2> <hr />
        <p className="break-words mt-4">{decoded || "No message decoded yet."}</p>
      </div>

      <div className="mt-6">
        <button onClick={() => decodeMessage(encoded)} className="!bg-blue-500 text-white py-2 px-4 rounded-lg">Decode</button>
      </div>
    </div>
  );
}
