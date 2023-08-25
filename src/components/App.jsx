import React, { useState } from "react";

// Utilities
import { getInitialData } from "../utils"; // Importing utility function to retrieve initial data

// Component imports
import Nav from "./Nav"; // Navigation component
import InputNotes from "./InputNotes"; // Component for inputting new notes
import NotesList from "./NotesList"; // Component for displaying lists of notes

/**
 * Main application component managing notes, providing search, input, and notes lists.
 * 
 * @returns {JSX.Element} - Rendered React component.
 */
export default function App() {
    // State for managing notes and search keyword
    const [notes, setNotes] = useState(getInitialData()); // Initialize notes with initial data
    const [keyword, setKeyword] = useState(""); // State to store search keyword

    /**
     * Search input handler.
     * 
     * @param {Event} event - The input event from the search field.
     */
    const searchFilter = (event) => {
        // Update keyword state with the lowercase value of the search input
        setKeyword(event.target.value.toLowerCase());
    }

    /**
     * Handler for saving new notes.
     * 
     * @param {string} title - The title of the new note.
     * @param {string} content - The content of the new note.
     */
    const onSave = (title, content) => {
        const currentDate = new Date(); // Current date and time

        // Create a new note and append it to the existing notes
        const newNote = {
            id: +currentDate,
            title: title,
            body: content,
            createdAt: currentDate.toISOString(),
            archived: false,
        };

        setNotes(prevNotes => [...prevNotes, newNote]); // Update notes state
    }

    /**
     * Handler for archiving/unarchiving notes.
     * 
     * @param {number} id - The ID of the note to be archived/unarchived.
     */
    const onArchive = (id) => {
        // Update the archived status of the note with the specified ID
        const updatedNotes = notes.map(note => note.id === id ? { ...note, archived: !note.archived } : note);
        setNotes(updatedNotes); // Update notes state
    }

    /**
     * Handler for deleting notes.
     * 
     * @param {number} id - The ID of the note to be deleted.
     */
    const onDelete = (id) => {
        // Filter out the note with the specified ID
        const remainingNotes = notes.filter(note => note.id !== id);
        setNotes(remainingNotes); // Update notes state
    }

    // Filter notes based on the search keyword
    const queryNotes = notes.filter(note => note.title.toLowerCase().includes(keyword));

    // Filter active and archived notes from the queryNotes
    const activeNotes = queryNotes.filter(note => !note.archived);
    const archivedNotes = queryNotes.filter(note => note.archived);

    // Render the main application component
    return (
        <>
            {/* Navigation component with search functionality */}
            <Nav searchHandler={searchFilter} />

            {/* Main body of the note app */}
            <div className="note-app__body">
                {/* Component for inputting new notes */}
                <InputNotes titleMaxLength={50} addNotes={onSave} />

                {/* Component to display active notes */}
                <NotesList
                    title={"Active Notes"}
                    notes={activeNotes}
                    onDelete={onDelete}
                    onArchive={onArchive}
                />

                {/* Component to display archived notes */}
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
