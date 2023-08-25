import React from "react";

// Utilities
import { showFormattedDate } from "../utils"; // Import utility function for formatting date

// Component
import EmptyList from "./EmptyList"; // Component for displaying an empty list message

/**
 * Component for displaying a list of notes.
 * 
 * @param {string} title - Title of the notes list.
 * @param {Array} notes - Array of notes to display.
 * @param {Function} onDelete - Callback function for deleting notes.
 * @param {Function} onArchive - Callback function for archiving notes.
 * @returns {JSX.Element} - Rendered notes list component.
 */
export default function NotesList({ title, notes, onDelete, onArchive }) {
    // Check if there are notes to display
    if (notes.length > 0) {
        return (
            <section className="note-app_body">
                <h2 className="">{title}</h2>
                <div className="notes-list note-item__body">
                    {/* Map through notes and render Card components */}
                    {notes.map(note => (
                        <Card {...note} key={note.id} onDelete={onDelete} onArchive={onArchive} />
                    ))}
                </div>
            </section>
        );
    } else {
        // Display an empty list message
        return (
            <EmptyList title={title} />
        );
    }
}

/**
 * Component for displaying an individual note card.
 * 
 * @param {number} id - ID of the note.
 * @param {string} body - Content/body of the note.
 * @param {string} title - Title of the note.
 * @param {boolean} archived - Archival status of the note.
 * @param {string} createdAt - Creation date of the note.
 * @param {Function} onDelete - Callback function for deleting the note.
 * @param {Function} onArchive - Callback function for archiving/unarchiving the note.
 * @returns {JSX.Element} - Rendered card component.
 */
function Card({ id, body, title, archived, createdAt, onDelete, onArchive }) {
    return (
        <div className="note-item">
            <div className="note-item__content">
                <h3 className="note-item__title">{title}</h3>
                <p className="note-item__date">{showFormattedDate(createdAt)}</p>
                <p className="note-item__body">{body}</p>
            </div>
            {/* Render action buttons */}
            <Action onArchive={onArchive} onDelete={onDelete} isArchived={archived} id={id} />
        </div>
    );
}

/**
 * Component for displaying action buttons within a note card.
 * 
 * @param {number} id - ID of the note.
 * @param {Function} onDelete - Callback function for deleting the note.
 * @param {Function} onArchive - Callback function for archiving/unarchiving the note.
 * @param {boolean} isArchived - Archival status of the note.
 * @returns {JSX.Element} - Rendered action component.
 */
function Action({ id, onDelete, onArchive, isArchived }) {
    return (
        <div className="note-item__action">
            {/* Button to delete the note */}
            <button onClick={() => onDelete(id)} className="note-item__delete-button">Delete</button>

            {/* Button to archive/unarchive the note */}
            <button onClick={() => onArchive(id)} className="note-item__archive-button">
                {isArchived ? 'Move' : 'Archive'}
            </button>
        </div>
    );
}
