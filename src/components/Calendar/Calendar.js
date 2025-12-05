import ReactCalendar from "react-calendar";
import './Calendar.css';

export default function CalendarComponent({ events, dateSelected }) {
    function hasEventOn(date) {
        const eventDates = events.map(e => new Date(e.date))

        return eventDates.some(
            (d) =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
        );
    }

    return (
        <ReactCalendar
            onClickDay={dateSelected}
            tileContent={({ date, view }) =>
                view === 'month' && hasEventOn(date) ? (
                    <div className="event-dot"></div>
                ) : null
            } />
    )
}