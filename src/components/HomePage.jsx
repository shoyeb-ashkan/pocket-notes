import React, { useState } from "react";
import NotesGroups from "./NotesGroups";
import NotesList from "./NotesList";

const HomePage = () => {
  // Group Id
  const [groupId, setGroupId] = useState(null);
  return (
    <div className="flex bg-white h-screen">
      <NotesGroups groupId={groupId} setGroupId={setGroupId} />

      {/* main view  */}
      <NotesList groupId={groupId} setGroupId={setGroupId}/>
    </div>
  );
};

export default HomePage;
