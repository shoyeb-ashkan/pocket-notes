import { createSlice, nanoid } from "@reduxjs/toolkit";
import { formatDate, formatTime } from "../utils/formatDateTime";

const initialState = {
  groups: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push({
        id: nanoid(),
        name: action.payload.name,
        colors: action.payload.color,
        notes: [],
      });
    },

    addNotes: (state, action) => {
      const { id, note } = action.payload;
      const existingGroup = state.groups.find((group) => group.id === id);
      if (existingGroup) {
        existingGroup.notes.push({
          id: nanoid(),
          note,
          date: formatDate(new Date()),
          time: formatTime(new Date()),
        });
      }
    },

    updateNote: (state, action) => {
      const { groupId, noteId, content } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        const note = group.notes.find((note) => note.id === noteId);
        if (note) {
          note.content = content;
        }
      }
    },

    deleteNote: (state, action) => {
      const { groupId, noteId } = action.payload;
      const group = state.groups.find((group) => group.id === groupId);
      if (group) {
        group.notes = group.notes.filter((note) => note.id !== noteId);
      }
    },

    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload.id
      );
    },
  },
});

export const { addGroup, addNotes, deleteGroup, deleteNote, updateNote } =
  notesSlice.actions;

export default notesSlice.reducer;
