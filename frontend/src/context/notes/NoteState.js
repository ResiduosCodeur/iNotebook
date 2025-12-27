import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  //Get all notes
  const getNotes = async () => {
    // API call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log("Fetched notes:", json);
      if (response.ok && Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Unexpected notes payload or status:", {
          status: response.status,
          payload: json,
        });
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      console.error("Add note failed:", response.status, errorPayload);
      return;
    }
    const savedNote = await response.json();
    setNotes(notes.concat(savedNote));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      console.error("Delete note failed:", response.status, errorPayload);
      return;
    }
    await response.json();

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };
  // Edit a note

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      console.error("Edit note failed:", response.status, errorPayload);
      return;
    }
    const result = await response.json();
    const updated = result.note ?? result; // backend sends {note}
    setNotes(notes.map((n) => (n._id === id ? { ...n, ...updated } : n)));
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
