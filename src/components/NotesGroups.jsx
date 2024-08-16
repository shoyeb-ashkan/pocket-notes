import React, { useEffect, useRef, useState } from "react";
import AddGroupForm from "./AddGroupForm";
import { useSelector } from "react-redux";
import { trimName } from "../utils/trimName";
import Footer from "./Footer";

const NotesGroups = ({ groupId, setGroupId }) => {
  const [headerWidth, setHeaderWidth] = useState(0);
  const [buttonposition, setButtonPosition] = useState(0);
  const parentRef = useRef(null);
  const headerRef = useRef(null);
  const [isShown, setIsShown] = useState(false);

  const groups = useSelector((state) => state.notes);
  // console.log(groups)
  useEffect(() => {
    const updateHeaderWidth = () => {
      if (parentRef.current && headerRef.current) {
        setHeaderWidth(parentRef.current.offsetWidth);
        if (parentRef.current.offsetWidth > 430) {
          return setButtonPosition(parentRef.current.offsetWidth * 0.8);
        } else {
          return setButtonPosition(parentRef.current.offsetWidth * 0.6);
        }
      }
    };
    // Update width on mount and on window resize
    updateHeaderWidth();
    window.addEventListener("resize", updateHeaderWidth);

    return () => {
      window.removeEventListener("resize", updateHeaderWidth);
    };
  }, [groupId]);

  return (
    <div
      className={
        "min-h-screen relative w-full sm:w-[210px] md:w-[320px] lg:w-[430px] overflow-y-auto scrollbar-hidden " +
        `${groupId ? "hidden sm:block" : "block"}`
      }
      ref={parentRef}
    >
      <header
        className="fixed top-0 left-0 h-28 sm:h-32 lg:h-36 flex justify-center items-center text-3xl sm:text-xl md:text-2xl lg:text-4xl font-semibold rounded-b-lg bg-white"
        style={{ width: headerWidth }}
        ref={headerRef}
      >
        Pocket Notes
      </header>

      <div className="h-28 sm:h-32 lg:h-36 w-full" />
      {groups.groups &&
        groups.groups.map((group) => {
          return (
            <div
              key={group.id}
              onClick={() => setGroupId(group.id)}
              className={
                "h-24 flex justify-start px-4 items-center rounded-2xl cursor-pointer text-lg sm:text-base md:text-xl lg:text-2xl mt-2 " +
                `${groupId === group.id ? "bg-[#dcdada]" : ""}`
              }
            >
              <span
                className={
                  "w-14 h-14 lg:w-16 lg:h-16 flex justify-center items-center flex-shrink-0 rounded-full border-2 mr-4 text-white " +
                  `${group.colors.color}`
                }
              >
                {trimName(group.name)}
              </span>
              <span className="capitalize whitespace-nowrap text-ellipsis">
                {group.name}
              </span>
            </div>
          );
        })}

      <AddGroupForm isShown={isShown} setIsShown={setIsShown} />

      <div
        className="fixed bottom-7 lg:h-20 lg:w-20 rounded-full lg:text-7xl md:h-14 md:w-14 md:text-6xl sm:h-12 sm:w-12 sm:text-4xl bg-[#16008B] flex justify-center items-center h-16 w-16 text-5xl hover:bg-[#3722AC] transform transition-colors delay-100 cursor-pointer"
        style={{ left: buttonposition }}
        onClick={() => setIsShown(true)}
      >
        +
      </div>

      <Footer headerWidth={headerWidth}/>
    </div>
  );
};

export default NotesGroups;
