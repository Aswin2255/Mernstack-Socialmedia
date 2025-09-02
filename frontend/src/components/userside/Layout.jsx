import React from 'react';
import Navigation from './Navigation';

function Layout({ children, chat }) {
  let chatclass;
  if (chat) {
    chatclass = 'md:flex mt-4  mx-auto gap-6';
  } else {
    chatclass = 'md:flex mt-4  md:m-8  mx-auto gap-6';
  }

  return (
    <div>
      <div className={chatclass}>
        <div className=" sticky md:w-3/12">
          <Navigation />
        </div>
        <div className=" mx-4 md:mx-0  md:w-9/12 " style={{ height: chat ? '80vh' : '' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
