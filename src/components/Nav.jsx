import React from "react";

export default function Nav({ searchHandler }) {
    return (
        <nav className="note-app__header">
            <h1>Notes</h1>
            <input placeholder="Search ..." onKeyUp={searchHandler}/>
        </nav>
    )
}