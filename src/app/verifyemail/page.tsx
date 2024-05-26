"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
    }, []);

    useEffect(() => {
      if (token.length) {
        verifyUserEmail();
      }
    }, [token]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-300 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="\login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
