import { useState, useCallback } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    // API call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk0MTcwMzY1MTMxMGNkYzhkODNlZDAwIn0sImlhdCI6MTc2NTg5NjM3MH0.k7-SjrroB7rQ7t-hJXrUQrcP8GooJfdCR7BiJLFlBZw",
        },
      });
      const json = await response.json();
      console.log("Fetched notes:", json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyYWZiMWM0YzBhNDY4NGZkNjA3MDhhIn0sImlhdCI6MTc2NDUwMzIzM30.kM1TkXST3xwqXffsaDrQKgjOXkHgMM5dsslFEIHvM8c",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("adding a new note");

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
  const deleteNote = (id) => {
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };
  // Edit a note

  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyYWZiMWM0YzBhNDY4NGZkNjA3MDhhIn0sImlhdCI6MTc2NDUwMzIzM30.kM1TkXST3xwqXffsaDrQKgjOXkHgMM5dsslFEIHvM8c",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
