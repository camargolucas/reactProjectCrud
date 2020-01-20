
import React from 'react';
import './Logo.css';
import logo from '../../assets/img/flooop.png'


export default props=>
    <aside className="logo"> 
        <a href="/" className="logo">
            <img src={logo} alt="logo"></img>
        </a>
    </aside>


