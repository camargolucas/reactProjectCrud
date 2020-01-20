import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Footer from '../components/template/Footer'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import { BrowserRouter } from 'react-router-dom'
import Routes  from './Routes'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Footer />
            <Routes />
            <Nav />
            <Logo />
        </div>
    </BrowserRouter>
