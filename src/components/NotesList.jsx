import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoScreen from "./InfoScreen";

import { trimName } from "../utils/trimName";
import { addNotes, deleteGroup, deleteNote } from "../feature/notesSlice";

import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import NotesExcerpt from "./NotesExcerpt";
import TextArea from "./TextArea";

const NotesList = ({ groupId, setGroupId }) => {
  const groupById = useSelector((state) =>
    state.notes.groups.find((group) => group.id === groupId)
  );

  const sortedNotes = useMemo(() => {
    return groupById?.notes.slice().sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return b.date.localeCompare(a.date);
    });
  }, [groupById]);

  const [note, setNote] = useState("");
  const [headerWidth, setHeaderWidth] = useState(0);
  const parentRef = useRef(null);
  const dispatch = useDispatch();

  //text area was going out of bound function to keep check of the boundries so it will render according to the parent div size
  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (parentRef.current) {
        setHeaderWidth(parentRef.current.offsetWidth);
      }
    };
    // Initial update
    updateDimensions();
    // Handle window resize
    window.addEventListener("resize", updateDimensions);
    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [groupById]);

  //save notes on button pressed
  const handleSubmit = () => {
    if (note.trim().length >= 1) {
      dispatch(addNotes({ id: groupId, note: note }));
      setNote("");
    }
  };

  //   adding functionaly for keyboardonly so
  //    user dont have to use mouse or trackpad while typing ofcourse
  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      handleSubmit();
    }
  };

  //Function to delete groups
  const handleGroupDelete = () => {
    dispatch(deleteGroup({ id: groupId }));
    setGroupId(null);
  };

  //Function to delete notes
  const handleNotesDelete = (noteId) => {
    dispatch(deleteNote({ groupId: groupId, noteId: noteId }));
  };
  //   console.log(!groupId);
  return (
    <div
      className={
        "bg-blue-200 min-h-screen overflow-y-auto w-full scrollbar-hidden " +
        `${!groupId ? "hidden sm:block" : "block"}`
      }
    >
      {!groupById ? (
        <InfoScreen />
      ) : (
        <div className="w-full" ref={parentRef}>
          <div className={"h-24 " + `${groupById.colors.bgColor}`}>
            <div className="flex h-full text-lg sm:text-base md:text-xl lg:text-2xl items-center w-full justify-between">
              <div className="flex items-center">
                <button
                  className="ml-3 w-8 h-8 flex sm:hidden justify-center items-center hover:opacity-80 cursor-pointer"
                  onClick={() => setGroupId(null)}
                >
                  <FaArrowLeft />
                </button>
                <span
                  className={
                    "w-14 h-14 lg:w-16 lg:h-16 flex justify-center items-center flex-shrink-0 rounded-full mr-4 mx-4 text-white " +
                    `${groupById.colors.color}`
                  }
                >
                  {trimName(groupById.name)}
                </span>
                <span className="text-white capitalize whitespace-nowrap text-ellipsis">
                  {groupById.name}
                </span>
              </div>
              <div className="mr-10  ">
                <button
                  className="p-2 rounded-xl bg-transparent cursor-pointer hover:bg-red-400 transition-colors duration-300"
                  onClick={handleGroupDelete}
                >
                  <MdDeleteForever color="white" size={34} />
                </button>
              </div>
            </div>
          </div>

          {/* Sorted notes list aka first come first serve */}
          <div className=" w-[90%] h-full">
            {sortedNotes && (
              <NotesExcerpt
                sortedNotes={sortedNotes}
                handleNotesDelete={handleNotesDelete}
              />
            )}
          </div>

          {/* Text area  */}
          <div className="h-32 sm:h-44 md:h-48 lg:h-56 w-full" />
          <TextArea
            bgColor={groupById.colors.bgColor}
            handleKeyDown={handleKeyDown}
            handleSubmit={handleSubmit}
            headerWidth={headerWidth}
            note={note}
            setNote={setNote}
          />
        </div>
      )}
    </div>
  );
};

export default NotesList;
