import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6941706951310cdc8d83ed03",
      user: "6941703651310cdc8d83ed00",
      title: "My note",
      description: "I love cricket",
      tag: "simple note",
      date: "2025-12-16T14:44:57.830Z",
      __v: 0,
    },
    {
      _id: "6941707951310cdc8d83ed05",
      user: "6941703651310cdc8d83ed00",
      title: "My note 2",
      description: "I love ODI",
      tag: "very simple note",
      date: "2025-12-16T14:45:13.420Z",
      __v: 0,
    },
    {
      _id: "694170c851310cdc8d83ed08",
      user: "6941703651310cdc8d83ed00",
      title: "My note 2",
      description: "I love ODI",
      tag: "very simple note",
      date: "2025-12-16T14:46:32.579Z",
      __v: 0,
    },
    {
      _id: "694170fa51310cdc8d83ed0a",
      user: "6941703651310cdc8d83ed00",
      title: "My note 3",
      description: "I love Test",
      tag: "very simple note 2",
      date: "2025-12-16T14:47:22.287Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = (title, description, tag) => {
    const note = {
      _id: "694170fa51310cdc8d83ed0a",
      user: "6941703651310cdc8d83ed00",
      title: title,
      description: description,
      tag: tag,
      date: "2025-12-16T14:47:22.287Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = () => {};
  // Edit a note

  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
