import React, { useState } from "react";

/**
 * Component for inputting new notes.
 * 
 * @param {number} titleMaxLength - Maximum length for note titles.
 * @param {Function} addNotes - Callback function for adding new notes.
 * @returns {JSX.Element} - Rendered input notes component.
 */
export default function InputNotes({ titleMaxLength, addNotes }) {
    // State for managing input fields
    const [titleLength, setTitleLength] = useState(titleMaxLength);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    /**
     * Event handler for input changes in the title field.
     * 
     * @param {Event} event - The input change event.
     */
    const handleTitleEvent = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= titleMaxLength) {
            setTitle(inputValue);
            setTitleLength(titleMaxLength - inputValue.length);
        }
    }

    /**
     * Event handler for input changes in the content field.
     * 
     * @param {Event} event - The input change event.
     */
    const handleContentEvent = (event) => {
        const inputValue = event.target.value;
        setContent(inputValue);
    }

    /**
     * Event handler for key down events.
     * 
     * @param {Event} event - The key down event.
     */
    const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === "Backspace") {
            setTitleLength(titleMaxLength);
        }
    }

    /**
     * Event handler for submitting the form.
     * 
     * @param {Event} event - The form submission event.
     */
    const onSubmitEventHandler = (event) => {
        event.preventDefault();
        addNotes(title, content); // Call the provided addNotes function with title and content
    }

    // Render the input notes component
    return (
        <div className="note-input">
            <h2 className="note-input__title">Make Notes</h2>
            {/* Render the Input component */}
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

/**
 * Subcomponent for input fields and form submission.
 * 
 * @param {Function} onSave - Callback function for saving the form.
 * @param {number} titleMaxLength - Maximum length for note titles.
 * @param {number} remainingChars - Remaining characters for the title.
 * @param {Function} handleTitleEvent - Event handler for title changes.
 * @param {Function} handleContentEvent - Event handler for content changes.
 * @param {Function} onKeyDown - Event handler for key down events.
 * @returns {JSX.Element} - Rendered input subcomponent.
 */
function Input({ onSave, titleMaxLength, remainingChars, handleTitleEvent, handleContentEvent, onKeyDown }) {
    // Render the input subcomponent
    return (
        <form onSubmit={onSave} className="note-input">
            {/* Display remaining characters for the title */}
            <p className="note-input__title__char-limit">Characters left: {remainingChars}</p>

            {/* Title input */}
            <input
                type="text"
                placeholder="Title"
                onChange={handleTitleEvent}
                onKeyDown={onKeyDown}
                maxLength={titleMaxLength}
            />

            {/* Content textarea */}
            <textarea cols="30" rows="10" placeholder="Your notes here..." onChange={handleContentEvent}></textarea>

            {/* Save button */}
            <button type="submit">Save</button>
        </form>
    );
}
