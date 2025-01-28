import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const MyCalendar = () => {
  const [value, setValue] = useState(new Date()); // Current month/year view
  const [selectedDate, setSelectedDate] = useState(null); // Date for popup
  const [events, setEvents] = useState([]); // Events for selected date
  const [newEvent, setNewEvent] = useState(''); // Input for new event
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Format the current month and year for display
  const options = { month: 'long', year: 'numeric' };
  const currentMonth = new Intl.DateTimeFormat('en-US', options).format(value);

  // Highlight today's date and dates with events
  const tileClassName = ({ date, view }) => {
    const today = new Date();
    const formattedDate = date.toISOString().split('T')[0];

    if (
      view === 'month' &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'highlight'; // Highlight today's date
    }

    // Highlight dates with events
    if (events.some(event => event.date === formattedDate)) {
      return 'event-date';
    }

    return null;
  };

  // Fetch events for the selected date
  const fetchEvents = async (date) => {
    setError(null); // Clear any previous errors
    setLoading(true); // Show loading state
    const formattedDate = date.toISOString().split('T')[0];
    try {
      const response = await fetch(`http://localhost:3001/${formattedDate}`);
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch events. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Add a new event
  const addEvent = async () => {
    if (!selectedDate) {
      alert('Please select a date before adding an event.');
      return;
    }

    if (!newEvent.trim()) {
      alert('Please enter an event name.');
      return;
    }

    const date = selectedDate.toISOString().split('T')[0];
    const event = { name: newEvent, date };

    try {
      const response = await fetch('http://localhost:3001/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        fetchEvents(selectedDate); // Refresh events after adding
        setNewEvent(''); // Clear input
      } else {
        alert('Failed to add event. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle clicking on a specific date
  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchEvents(date);
  };

  // Handle calendar navigation
  const handleCalendarChange = (date) => {
    setValue(date);
    setSelectedDate(null); // Close popup when navigating
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{currentMonth}</h2>
      <Calendar
        onChange={handleCalendarChange}
        onClickDay={handleDateClick}
        value={value}
        tileClassName={tileClassName}
      />

      {/* Popup Window for Events */}
      {selectedDate && (
        <div className="popup">
          <div className="popup-content">
            <h3>Events on {selectedDate.toDateString()}</h3>
            {error && <p className="error-message">{error}</p>}
            <ul>
              {loading ? (
                <li>Loading events...</li>
              ) : events.length > 0 ? (
                events.map((event, index) => <li key={index}>{event.name}</li>)
              ) : (
                <li>No events for this date.</li>
              )}
            </ul>
            <input
              type="text"
              placeholder="Add a new event"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <button onClick={addEvent} className="add-btn">
              Add Event
            </button>
            <button onClick={() => setSelectedDate(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
