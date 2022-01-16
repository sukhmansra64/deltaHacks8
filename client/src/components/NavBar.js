import React from 'react';
import {Link} from 'react-router-dom';
import picture from '../style/media/westernAIinvert.png';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const NavBar = () => {
    return (
        <div className='topnav'>
            <Link to='/' className='logo'>
                <img className='logo' src={picture}/>
            </Link>
            <nav>
                <ul>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/'>DASHBOARD</Link></li>
                    <li><Link to='/tran'>TRANSCRIBE</Link></li>
                </ul>
            </nav>
            <a href='https://www.facebook.com/westernuai/'target='_blank' className='logo'>
                <img className='wAI' src={picture}/>
            </a>
        </div>
    );
};

export default NavBar;
