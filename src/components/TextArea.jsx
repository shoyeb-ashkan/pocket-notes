import React from "react";

const TextArea = ({
  note,
  setNote,
  bgColor,
  headerWidth,
  handleKeyDown,
  handleSubmit,
}) => {
  return (
    <div
      className={
        "fixed flex justify-center items-center bottom-0 right-0 h-32 sm:h-44 md:h-48 lg:h-56 w-full " +
        `${bgColor}`
      }
      style={{ width: headerWidth }}
    >
      <div className="relative mx-3 my-3 sm:mx-4 sm:my-4 md:mx-6 md:my-4 lg:mx-8 lg:my-6  w-full h-[95%] rounded-lg flex items-center justify-center">
        <textarea
          placeholder="Enter your text here..........."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-full h-full px-4 py-2 bg-white text-base sm:text-sm md:text-base lg:text-lg rounded-lg resize-none font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        <button
          onClick={() => handleSubmit()}
          disabled={!note}
          className="absolute bottom-2 right-2 p-2 text-white rounded-full flex items-center justify-center "
          style={{ width: "35px", height: "29px" }}
        >
          <svg
            width="35"
            height="29"
            viewBox="0 0 35 29"
            fill={!note ? "#B0B0B0" : "#4169E1"} // Apply color directly
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TextArea;
