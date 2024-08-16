import React from "react";

import notepad from "../assets/svg/notepad.svg";

const InfoScreen = () => {
  return (
    <div className="flex max-h-screen justify-center items-center h-full">
      <div>
        <img
          className="md:w-[636px] md:h-[313px] h-[80%] w-[80%]"
          src={notepad}
          alt="NotePad.png"
        />
        <div className="text-center">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            Pocket Notes
          </div>
          <div className="font-semibold m-2">
            Send and receive message without keeping your phone online. <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;
