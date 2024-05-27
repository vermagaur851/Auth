import User from "@/models/userModel";
import React from "react";

async function page({ params }: any) {
  const user = await User.findById(params.user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <h2 className="bg-green-700 rounded p-3">Hey {user.username}</h2>
    </div>
  );
}

export default page;
