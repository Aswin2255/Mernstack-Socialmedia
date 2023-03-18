import React from "react";
import Avatar from "./Avatar";

function Userslist() {
  return (
    <div>
      <div className="flex justify-around mt-2 ">
        <Avatar />
        <div>
          <h3 className="font-bold text-xl">User</h3>
          <span className="text-sm leading-4">5 mutual friends</span>
        </div>
        <div>
          <button className="bg-socialblue text-white px-6 py-1 rounded-md m-2">
            Details
          </button>
          <button className="bg-yellow-600 text-white px-6 py-1 rounded-md m-2">
            Review reports
          </button>
          <button className="bg-red-800 text-white px-6 py-1 rounded-md m-2">
            Actions
          </button>
        </div>
      </div>
      <div className="flex justify-around mt-2 ">
        <Avatar />
        <div>
          <h3 className="font-bold text-xl">User</h3>
          <span className="text-sm leading-4">5 mutual friends</span>
        </div>
        <div>
          <button className="bg-socialblue text-white px-6 py-1 rounded-md m-2">
            Details
          </button>
          <button className="bg-yellow-600 text-white px-6 py-1 rounded-md m-2">
            Review reports
          </button>
          <button className="bg-red-800 text-white px-6 py-1 rounded-md m-2">
            Actions
          </button>
        </div>
      </div>
    </div>
  );
}

export default Userslist;
