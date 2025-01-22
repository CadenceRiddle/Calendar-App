import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () =>{

    const [isToggled, setIsToggled] = useState('false');

    const toggleSideBar = () =>{
        setIsToggled(!isToggled);
    };

    return(
        <div className={`sidebar ${isToggled ? 'collapsed' : ''}`}onClick={toggleSideBar}>
            <div className='sidebar-content'>
                <h3>{isToggled ? '>' : 'Sidebar'}</h3>
                    {!isToggled && (
                <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                </ul>
            )}
            </div>
        </div>
    );


}

export default Sidebar;