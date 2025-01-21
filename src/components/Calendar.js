import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());

  // Format the current month and year
  const options = { month: 'long', year: 'numeric' };
  const currentMonth = new Intl.DateTimeFormat('en-US', options).format(value);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{currentMonth}</h2>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default MyCalendar;