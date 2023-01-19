import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./Component/main/Main";
import Sidebar from "./Component/sidebar/Sidebar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [activeNote, setActiveNote] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    const updatedNotes = [newNote, ...notes];
    setActiveNote(newNote.id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const filter = (event, identifier) => {
    let newDate = date;
    let newMonth = month;
    let newYear = year;

    if (identifier === "date") {
      newDate = event.target.value;
      setDate(event.target.value);
    }
    if (identifier === "month") {
      newMonth = event.target.value;
      setMonth(event.target.value);
    }
    if (identifier === "year") {
      newYear = event.target.value;
      setYear(event.target.value);
    }

    let notes = localStorage.notes ? JSON.parse(localStorage.notes) : [];

    if (newDate !== "") {
      notes = notes.filter(
        (note) => new Date(note.lastModified).getDay() + 1 == newDate
      );
    }
    if (newMonth !== "") {
      notes = notes.filter((note) => {
        return new Date(note.lastModified).getMonth() + 1 == newMonth;
      });
    }
    if (newYear !== "") {
      notes = notes.filter(
        (note) => new Date(note.lastModified).getFullYear() == newYear
      );
    }
    setNotes(notes);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        filter={filter}
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main
        onAddNote={onAddNote}
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
}

export default App;
