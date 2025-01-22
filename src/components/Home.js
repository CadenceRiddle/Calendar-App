import React from 'react';
import Sidebar from './Sidebar';
import MyCalendar from './Calendar';
import './Home.css'; // Optional for additional styling

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Home Page</h1>
        <MyCalendar />
      </div>
    </div>
  );
};

export default Home;
