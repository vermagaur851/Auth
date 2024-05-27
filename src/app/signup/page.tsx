"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ps, setPs] = useState(true);

  const onSignup = async () => {
    if (buttonDisabled) return;
    try {
      setLoading(true);
      setButtonDisabled(true);
      const res = await axios.post("/api/users/signup", user);
      console.log(res)
      alert(res.data.message)
      setButtonDisabled(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false)
      setButtonDisabled(false);
      console.log(error.response.data.error);
      alert("Something went wrong")
    }
  };

  useEffect(() => {
    if (user.email.length && user.password.length && user.username.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Sign up"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none
      focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none
        focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <div className="flex flex-row">
        <input
          className="p-2 w-52 border border-gray-300 rounded-lg mb-4 focus:outline-none
        focus:border-gray-600 text-black flex flex-row-reverse"
          value={user.password}
          id="password"
          type={ps ? "password" : "text"}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        ></input>
        <button className="mb-6" onClick={() => setPs((v) => !v)}>
          👀
        </button>
      </div>
      <button onClick={onSignup} className="p-2 rounded-lg mb-4 border">
        {buttonDisabled ? "No signup" : "signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

export default Page;
