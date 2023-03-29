import React from 'react';

function Avatar({ size, pc, img }) {
  console.log(img);
  let width = 'w-12';
  if (size === 'big') {
    width = 'w-36';
  }
  if (pc) {
    width = 0;
  }
  return (
    <div>
      <div className={`${width} rounded-full overflow-hidden`}>
        {img ? (
          <img src={`/assets/${img}`} alt="postimg"></img>
        ) : (
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile pic"
          ></img>
        )}
      </div>
    </div>
  );
}

export default Avatar;
