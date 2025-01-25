import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  // Format the current month and year
  const options = { month: 'long', year: 'numeric' };
  const currentMonth = new Intl.DateTimeFormat('en-US', options).format(value);

  const tileClassName = ({ date, view }) => {
    const today = new Date();
    if (
      view === 'month' && // Only add the class for month view
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'highlight';
    }
    return null;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{currentMonth}</h2>
      <Calendar onChange={setValue} value={value} tileClassName={tileClassName} />
    </div>
  );
};

export default MyCalendar;