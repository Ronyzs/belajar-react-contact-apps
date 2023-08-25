import React, { useState } from "react";

export default function InputNotes({ titleMaxLength, addNotes }) {
    const [titleLength, setTitleLength] = useState(titleMaxLength);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    const handleTitleEvent = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= titleMaxLength) {
            setTitle(inputValue);
            setTitleLength(titleMaxLength - inputValue.length);
        }
    }

    const handleContentEvent = (event) => {
        const inputValue = event.target.value;
        setContent(inputValue)
    }

    const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === "Backspace") {
            setTitleLength(titleMaxLength)
        }
    }

    const onSubmitEventHandler = (event) => {
        event.preventDefault()
        addNotes(title, content);
    }

    return (
        <div className="note-input">
            <h2 className="note-input__title">Make Notes</h2>
            <Input
                onSave={onSubmitEventHandler}
                titleMaxLength={titleMaxLength}
                remainingChars={titleLength}
                handleTitleEvent={handleTitleEvent}
                handleContentEvent={handleContentEvent}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

function Input({ onSave, titleMaxLength, remainingChars, handleTitleEvent, handleContentEvent, onKeyDown }) {
    return (
        <form onSubmit={onSave} className="note-input">
            <p className="note-input__title__char-limit">Sisa Karakter: {remainingChars}</p>
            <input type="text" placeholder="Title" onChange={handleTitleEvent} onKeyDown={onKeyDown} maxLength={titleMaxLength} />
            <textarea cols="30" rows="10" placeholder="Your notes here..." onChange={handleContentEvent}></textarea>
            <button type="submit">Save</button>
        </form>
    )
}