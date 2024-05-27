"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/profile");
      console.log(res);
      if (res.status == 200) {
        const val = res.data.data._id;
        setData(val);
      }
    } catch (error: any) {
      setData("nothing");
      console.log("error while fetching data...");
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "no data found"
        ) : (
          <Link className="text-white " href={`/profile/${data}`}>
            {data}
          </Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded "
        onClick={logout}
      >
        logout
      </button>
      <button
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-2 rounded "
        onClick={getUserDetail}
      >
        Get User detail
      </button>
    </div>
  );
}

export default page;
