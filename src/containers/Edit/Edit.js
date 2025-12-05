import { useState } from "react";
import CalendarComponent from "../../components/Calendar/Calendar";
import EventInput from "../../components/EventInput/EventInput";
import EventList from "../../components/EventList/EventList";
import './Edit.css';

export default function Edit() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventName, setEventName] = useState("");
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [eventTag, setEventTag] = useState("");

    const TAG_OPTIONS = ["Work", "School", "Personal", "Important", "Other"];

    const sortByTag = TAG_OPTIONS.reduce((groups, tag) => {
        groups[tag] = [];
        return groups;
    }, {});

    events.forEach(event => {
        const tag = event.tag || "Other";
        sortByTag[tag].push(event);
    });

    const dateSelected = (date) => {
        setSelectedDate(date);
    };

    const eventInformation = (e) => {
        setEventName(e.target.value);
    };

    const createEvent = () => {
        if (!selectedDate || !eventName.trim()) return;
        const newEvent = {
            id: Date.now(),
            date: selectedDate,
            title: eventName.trim(),
            tag: eventTag || "Other",
        };

        setEvents((prev) => [...prev, newEvent]);
        setEventName("");
    };

    const deleteEvent = (id) => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
    }

    return (
        <div className="calendar-container">
            <CalendarComponent selectedDate={selectedDate} events={events} dateSelected={dateSelected} />
            <div className="task-maker">
                <EventInput selectedDate={selectedDate} eventName={eventName} eventInformation={eventInformation} eventTag={eventTag} setEventTag={setEventTag} TAG_OPTIONS={TAG_OPTIONS} createEvent={createEvent} />
            </div>
            <EventList events={events} TAG_OPTIONS={TAG_OPTIONS} selectedEventId={selectedEventId} setSelectedEventId={setSelectedEventId} deleteEvent={deleteEvent} />
        </div>
    );
}