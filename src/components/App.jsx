import React, { useState } from "react";

// Utilities
import { getInitialData } from "../utils";

// Component
import Nav from "./Nav";
import InputNotes from "./InputNotes";
import NotesList from "./NotesList";

export default function App() {
    const [notes, setNotes] = useState(getInitialData());
    const [keyword, setKeyword] = useState("");

    const searchFilter = (event) => {
        setKeyword(event.target.value.toLowerCase());
    }

    const onSave = (title, content) => {
        const currentDate = new Date()
        setNotes(prevNotes =>
            [
                ...prevNotes,
                {
                    id: +currentDate,
                    title: title,
                    body: content,
                    createdAt: currentDate.toISOString(),
                    archived: false,
                }
            ]
        )
    }

    const onArchive = (id) => {
        const updatedNotes = notes.map(note => {
            note.id === id ? { ...note, archived: !note.archived } : note
        })

        setNotes(updatedNotes);
    }

    const onDelete = (id) => {
        const deletedNotes = notes.filter(note => note.id !== id)

        setNotes(deletedNotes);
    }

    const queryNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword));

    const activeNotes = queryNotes.filter(note => !note.archived);
    const archivedNotes = queryNotes.filter((note) => note.archived);

    return (
        <>
            <Nav searchHandler={searchFilter} />
            <div className="note-app__body">
                <InputNotes titleMaxLength={50} addNotes={onSave} />
                <NotesList
                    title={"Active Notes"}
                    notes={activeNotes}
                    onDelete={onDelete}
                    onArchive={onArchive}
                />
                <NotesList
                    title={"Archive Notes"}
                    notes={archivedNotes}
                    onDelete={onDelete}
                    onArchive={onArchive}
                />
            </div>
        </>
    );
}