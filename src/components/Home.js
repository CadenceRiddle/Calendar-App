import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MyCalendar from './Calendar';
import './Home.css';

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="home-container">
      <Sidebar onAddEvent={() => setRefresh(!refresh)} />
      <div className="main-content">
        <h1>Welcome to the Home Page</h1>
        <MyCalendar key={refresh} />
      </div>
    </div>
  );
};

export default Home;
