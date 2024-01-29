import React from "react";
import Loading from "./Spinner.svg";

const Spinner = () => {
  return (
    <>
      <div className="flex justify-center w-full items-center h-[50vh]">
        <img src={Loading} alt="Loading" className="h-20" />
      </div>
    </>
  );
};

export default Spinner;
