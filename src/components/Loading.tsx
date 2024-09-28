import React from "react";

const Loading = () => {
  return (
    <>
      <div className="loading w-full h-full flex justify-center items-center">
        <div className="loading__icon w-[100vw] h-[100vh] flex flex-col justify-center items-center"> 
            <img src="/loading1.gif" alt="" height={200} width={200} />
            Loading ......
        </div>
      </div>
    </>
  );
};
export default Loading;