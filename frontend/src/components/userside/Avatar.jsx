import React from "react";

function Avatar({ size , pc }) {
  let width = "w-12";
  if (size === "big") {
    width = "w-36";
  }
  if (pc){
    width = 0
  }
  return (
    <div>
      <div className={`${width} rounded-full overflow-hidden`}>
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjBmYWNlJTIwYXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="profile pic"
        ></img>
      </div>
    </div>
  );
}

export default Avatar;
