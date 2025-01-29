import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onAddEvent }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const toggleSideBar = () => {
    setIsToggled(!isToggled);
  };

  const handleAddEvent = async () => {
    if (!eventName || !eventDate || !eventLocation) {
      alert('Please enter a name, date, and location.');
      return;
    }

    const newEvent = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
    };

    try {
      const response = await fetch('http://localhost:3001/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        alert('Event added successfully!');
        setShowForm(false);
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setEventDescription('');
        onAddEvent(); // Refresh calendar
      } else {
        alert('Failed to add event.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`sidebar ${isToggled ? 'collapsed' : ''}`} onClick={toggleSideBar}>
      <div className="sidebar-content">
        <h3>{isToggled ? '>' : 'Sidebar'}</h3>
        {!isToggled && (
          <ul>
            <li onClick={() => setShowForm(true)}>Add Event</li>
          </ul>
        )}
      </div>

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New Event</h3>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
            <button onClick={handleAddEvent} className="add-btn">
              Add Event
            </button>
            <button onClick={() => setShowForm(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
