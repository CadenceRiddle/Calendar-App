import React from 'react';
import './Home.css';
import MyCalendar from './Calendar';

const Home = () => {
    return (
        <div className='home-container'>
            <div className='top'>Home</div>
            <div className='main'>
                <MyCalendar />
            </div>
            <div className='side'>Sidebar</div>
        </div>
    );
};

export default Home