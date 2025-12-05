import './EventList.css';

export default function EventList({ events, TAG_OPTIONS, selectedEventId, setSelectedEventId, deleteEvent }) {
    const sortByTag = TAG_OPTIONS.reduce((groups, tag) => {
        groups[tag] = [];
        return groups;
    }, {});

    events.forEach(event => {
        const tag = event.tag || "Other";
        sortByTag[tag].push(event);
    });

    return (
        <div id="events-list">
            {TAG_OPTIONS.map(tag => (
                <div key={tag} className="event-group">
                    <h3>{tag}</h3>
                    <ul>
                        {sortByTag[tag].length === 0 ? (
                            <li className="no-events">Nothing planned</li>
                        ) : (
                            sortByTag[tag]
                                .sort((a, b) => new Date(a.date) - new Date(b.date))
                                .map(e => (
                                    <li
                                        key={e.id}
                                        onClick={() => setSelectedEventId(selectedEventId === e.id ? null : e.id)}
                                        className={selectedEventId === e.id ? "event-item selected" : "event-item"}
                                    >
                                        {e.date.toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "short",
                                            day: "numeric",
                                        })}: {e.title}
                                        {selectedEventId === e.id && (
                                            <button onClick={(event) => { event.stopPropagation(); deleteEvent(e.id); }}>
                                                Remove
                                            </button>
                                        )}
                                    </li>
                                ))
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
}