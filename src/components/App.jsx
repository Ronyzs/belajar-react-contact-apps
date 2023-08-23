import React from "react";

// Utilities
import { getInitialData } from "../utils";

// Component
import Nav from "./Nav";
import InputNotes from "./InputNotes";
import NotesList from "./NotesList";

export default class App extends React.Component {
    constructor(props) {
        super(props)

        // init state
        this.state = {
            "notes": getInitialData(),
            "keyword": "",
        }

        //bind 
        this.onDelete = this.onDelete.bind(this)
        this.onArchive = this.onArchive.bind(this)
        this.onSave = this.onSave.bind(this)
        this.searchFilter = this.searchFilter.bind(this)
    }

    searchFilter(event) {
        this.setState({
            keyword: event.target.value.toLowerCase(),
        });
    }

    onSave({ title, content }) {
        const currentDate = new Date()
        this.setState(
            (prevState) => {
                return {
                    notes: [
                        ...prevState.notes,
                        {
                            id: +currentDate,
                            title: title,
                            body: content,
                            createdAt: currentDate.toISOString(),
                            archived: false,
                        }
                    ]
                }
            }
        )
    }

    onArchive(id) {
        const updatedNotes = this.state.notes.map(note => {
            if (note.id == id)
                return { ...note, archived: !note.archived }
            return note
        })

        this.setState({
            notes: updatedNotes,
        })
    }

    onDelete(id) {
        const notes = this.state.notes.filter(note => note.id !== id)
        this.setState(
            {
                notes: notes,
            }
        )
    }

    render() {
        const queryNotes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.keyword);
        });

        return (
            <>
                <Nav searchHandler={this.searchFilter} />
                <div className="note-app__body">
                    <InputNotes titleMaxLength={50} addNotes={this.onSave} />
                    <NotesList title={"Active Notes"} notes={queryNotes.filter(note => !note.archived)} onDelete={this.onDelete} onArchive={this.onArchive} />
                    <NotesList title={"Archive Notes"} notes={queryNotes.notes.filter((note) => note.archived)} onDelete={this.onDelete} onArchive={this.onArchive} />
                </div>
            </>
        );
    }
}