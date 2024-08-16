import React from "react";

import { MdDeleteForever } from "react-icons/md";

const NotesExcerpt = ({ sortedNotes, handleNotesDelete }) => {
  return sortedNotes.map(({ id, note, time, date }) => {
    return (
      <div
        key={id}
        className="mt-4 relative mx-8 w-full p-6 h-min rounded-lg bg-white"
      >
        <pre className="p-1 text-base sm:text-sm md:text-base lg:text-lg h-min w-full whitespace-pre-wrap break-words ">
          {note}
        </pre>
        <div className="w-full text-xs inline-block italic align-middle text-black/75 text-end mt-2">
          <span>{date}</span>
          <span className=" h-2 w-2 inline-block align-middle bg-black/75 mx-3 my-1 rounded"></span>
          <span>{time}</span>
        </div>
        <button
          className="absolute top-3 right-3 p-1 hover:bg-slate-300 rounded-lg"
          onClick={() => handleNotesDelete(id)}
        >
          <MdDeleteForever />
        </button>
      </div>
    );
  });
};

export default NotesExcerpt;
