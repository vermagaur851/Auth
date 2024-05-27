import React from "react";

function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <h2 className="bg-green-700 rounded p-3">{params.user}</h2>
    </div>
  );
}

export default page;
