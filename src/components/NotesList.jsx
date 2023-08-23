import React from "react";

// Utilities
import { showFormattedDate } from "../utils";

// Component
import EmptyList from "./EmptyList";

export default function NotesList({ title, notes, onDelete, onArchive }) {

    if (notes.length > 0)
        return (
            <section className="note-app_body">
                <h2 className="">{title}</h2>
                <div className="notes-list note-item__body">
                    {
                        notes.map((note) => {
                            return <Card {...note} key={note.id} onDelete={onDelete} onArchive={onArchive} />
                        })
                    }
                </div>
            </section>
        )
    else
        return (
            <EmptyList title={title} />
        )
}

function Card({ id, body, title, archived, createdAt, onDelete, onArchive }) {
    return (
        <div className="note-item ">
            <div className="note-item__content">
                <h3 className="note-item__title">{title}</h3>
                <p className="note-item__date">{showFormattedDate(createdAt)}</p>
                <p className="note-item__body">{body}</p>
            </div>
            <Action onArchive={onArchive} onDelete={onDelete} isArchived={archived} id={id} />
        </div>
    )
}

function Action({ id, onDelete, onArchive, isArchived }) {
    return (
        <div className="note-item__action">
            <button onClick={() => onDelete(id)} className="note-item__delete-button">Delete</button>
            <button onClick={() => onArchive(id)} className="note-item__archive-button">{isArchived ? 'Move' : 'Archive'}</button>
        </div>
    )
}