// import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
// import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
// import { toast } from 'react-toastify';

export default function Milkbooth() {

    function handleLogout()
    {
        // sessionStorage.removeItem('userid');
    }

  return (
    <div className='container'>
        <h3 className='heading mb-3'>MilkBooth DashBoard</h3>
        <div className='text-end'>
            <Link to="/" className='btn btn-warning mb-3' onClick={handleLogout}>Log Out</Link>
        </div>
        <div className='text-center mb-3'>
            <Link to="milkboothinfo" className='btn btn-primary me-2'>Place Order</Link>
            <Link to="milkboothstock" className='btn btn-primary me-2'>Milk Booth Stock</Link>
            <Link to="milkboothsales" className='btn btn-primary'>Milk Booth Sales</Link> 
        </div>
        <Outlet/>
    </div>
  )
}
