import React from "react";

export default class InputNotes extends React.Component {
    constructor(props) {
        super(props)

        // init state
        this.state = {
            "titleLength": this.props.titleMaxLength,
            "title": "",
            "content": ""
        }

        // bind
        this.handleTitleEvent = this.handleTitleEvent.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleContentEvent = this.handleContentEvent.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }

    handleTitleEvent(event) {
        const inputValue = event.target.value;
        if (inputValue.length <= this.props.titleMaxLength) {
            this.setState({
                titleLength: this.props.titleMaxLength - inputValue.length,
                title: inputValue
            });
        }
    }

    handleContentEvent(event) {
        const inputValue = event.target.value;
        this.setState({
            content: inputValue
        });
    }

    handleKeyDown(event) {
        if (event.ctrlKey && event.key === "Backspace") {
            this.setState({
                titleLength: this.props.titleMaxLength,
            });
        }
    }

    onSubmitEventHandler(event) {
        event.preventDefault()
        this.props.addNotes(this.state)
    }

    render() {
        return (
            <div className="note-input">
                <h2 className="note-input__title">Make Notes</h2>
                <Input
                    onSave={this.onSubmitEventHandler}
                    titleMaxLength={this.props.titleMaxLength}
                    remainingChars={this.state.titleLength}
                    handleTitleEvent={this.handleTitleEvent}
                    handleContentEvent={this.handleContentEvent}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        );
    }
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