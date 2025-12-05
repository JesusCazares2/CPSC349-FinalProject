import './EventInput.css';

export default function EventInput({ selectedDate, eventName, eventInformation, eventTag, setEventTag, TAG_OPTIONS, createEvent }) {
    if (!selectedDate) return null;

    return (
        <div className="event-input">
            <input
                type="text"
                value={eventName}
                onChange={eventInformation}
                placeholder={selectedDate ? `Add a task to ${selectedDate.toDateString()}` : "Add a task"}
            />

            <select
                value={eventTag}
                onChange={(e) => setEventTag(e.target.value)}
                className="tag-select"
            >

                <option value="">Select List</option>
                {TAG_OPTIONS.map((tag) => (
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>

            <button onClick={createEvent}>Add Event</button>
        </div>
    )
}