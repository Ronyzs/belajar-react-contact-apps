import React from "react";

export default function EmptyList({ title }) {
    return (
        <section className="note-app_body">
            <h2 className="">{title}</h2>
            <div className="notes-list__empty-message">
                Tidak ada catatan
            </div>
        </section>
    )
}