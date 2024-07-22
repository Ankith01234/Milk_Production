import React from 'react';
import './Adminaccount.css';
import { Link, Outlet } from 'react-router-dom';

export default function Adminaccount() {
  return (
    <>
      <div className='container'>
        <h3 className="heading">Admin DashBoard</h3>
        <div className='text-end'>
          <Link to="/" className='btn btn-warning'>Logout</Link>
        </div>
        <div className='text-center mb-3'>
          <Link to="addarea" className='btn btn-primary me-2'>Add Area</Link>
          <Link to="addincharger" className='btn btn-primary me-2'>Add Incharger</Link>
          <Link to="addproduct" className='btn btn-primary me-2'>Add Products</Link>
          <Link to="productproduction" className='btn btn-primary me-2'>Product Production</Link>
          <Link to="productsales" className='btn btn-primary me-2'>Product Sales</Link>
          <Link to="milkboothreport" className='btn btn-primary'>MilkBooth Report</Link>
        </div>
      </div>
      <Outlet/>
    </>
  )
}
