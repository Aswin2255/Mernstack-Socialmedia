import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

function Loader() {
  return (
    <div>
      <div className="flex gap-3 justify-center">
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </div>
  );
}

export default Loader;
