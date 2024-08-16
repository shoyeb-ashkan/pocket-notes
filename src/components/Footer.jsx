import React from "react";

const Footer = ({ headerWidth }) => {
  return (
    <div
      className="fixed z-10 bottom-0 left-0 w-full bg-lime-500 whitespace-pre-wrap break-words md:text-base text-xs  italic text-center"
      style={{ width: headerWidth }}
    >
      Created by{" "}
      <span
        className="font-bold cursor-pointer hover:underline"
        onClick={() => {
          window.open("https://shoyeb-ashkan.netlify.app/");
        }}
      >
        Shoyeb Ashkan
      </span>
    </div>
  );
};

export default Footer;
