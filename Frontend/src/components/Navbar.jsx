import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate()
  const navStyle = {
    background: '#333',
    padding: '10px',
    marginBottom: '20px',
    color: 'white',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const liStyle = {
    margin: '0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };
  const logutHandler=()=>{
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><h1>Hi {localStorage.getItem('username')}! </h1></li>
        {/* <li style={liStyle}><a style={linkStyle} href="#">About</a></li> */}
        {/* <li style={liStyle}><a style={linkStyle} href="#">Services</a></li> */}
        <li style={liStyle}><Button style={linkStyle} onClick={logutHandler} >Logout</Button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
