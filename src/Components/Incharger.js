import React, { useEffect, useState } from 'react'
import './Adminaccount.css';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Incharger() {

    const [inchargerid, setinchargerid] = useState("");

    // const [boothownername, setboothownername] = useState("");
    // const [boothplace, setboothplace] = useState("");
    // const [boothemail, setboothemail] = useState("");
    // const [boothmobile, setboothmobile] = useState("");

    // const [milkboothlst, setmilkboothlst] = useState([]);

    // const [orderlst, setorderlst] = useState([]);

    // const [productlst, setproductlst] = useState([]);

    // useEffect(() => {
    //     getBooth();
    //     getOrders();
    // }, [])

    function handleReset() {
        sessionStorage.removeItem('userid', inchargerid);
    }

    // function handleBooth() {
    //     const obj = { boothownername, boothplace, boothemail, boothmobile };

    //     axios.post(`http://localhost:8080/addMilkBooth/${inchargerid}`, obj)
    //         .then((res) => {
    //             if (res.data === "MilkBooth Added Successfully")
    //                 toast.success(res.data);
    //             else
    //                 toast.error(res.data);
    //         })

    // }

    // function getBooth() {
    //     var icid = sessionStorage.getItem('userid');
    //     setinchargerid(icid);
    //     axios.get(`http://localhost:8080/getBooth/${icid}`)
    //         .then((res) => {
    //             setmilkboothlst(res.data);
    //         })
    // }

    // function getOrders() {
    //     var icid = sessionStorage.getItem('userid');

    //     axios.get(`http://localhost:8080/getMilkBoothOrders/${icid}`)
    //         .then((res) => {
    //             if (typeof res.data === 'object') {
    //                 setorderlst(res.data);
    //             }
    //             else
    //                 toast.error(res.data);
    //         })

    // }

    // function handleOrder(mkid) {
    //     axios.get(`http://localhost:8080/particularBoothOrder/${mkid}`)
    //         .then((res) => {
    //             if (typeof res.data === 'object') {
    //                 setproductlst(res.data);
    //             }
    //             else
    //                 toast.error(res.data);
    //         })
    // }

    return (
        <div className='container'>
            <h3 className='heading'>Incharger Dashboard</h3>
            <div className='text-end mb-3'>
                <Link to="/" className='btn btn-warning' onClick={handleReset} >Logout</Link>
            </div>
            <div className='text-center mb-3'>
                <Link to="inchargerinfo" className='btn btn-primary me-2'>Add Milk Booth</Link>
                <Link to="orders" className='btn btn-primary'>Orders</Link>
            </div>
            <Outlet/>
            <div>
                {/* <div className='row'>
                    <div className='col-3'>
                        <h4 className='heading'>Enter New Milk Booth</h4>
                        <div className='card border-2 p-3'>
                            <div>
                                <label>Your ID</label>
                                <input type='text' className='form-control border-2' value={inchargerid} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Milk Booth Owner Name</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setboothownername(e.target.value)} value={boothownername} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Milk Booth Place</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setboothplace(e.target.value)} value={boothplace} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Milk Booth Email</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setboothemail(e.target.value)} value={boothemail} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Milk Booth Mobile Number</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setboothmobile(e.target.value)} value={boothmobile} />
                            </div>
                            <div className='mt-2 text-end'>
                                <input type='button' className='btn btn-primary' value="Submit" onClick={handleBooth} />
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <h4 className='heading'>MilkBooth Under Your Control</h4>
                        <div>
                            <table className='table text-center table-striped'>
                                <thead>
                                    <tr>
                                        <th>Milk Booth ID</th>
                                        <th>Milk Booth Owner</th>
                                        <th>Milk Booth Place</th>
                                        <th>Milk Booth Email</th>
                                        <th>Milk Booth Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        milkboothlst.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.mkid}</td>
                                                    <td>{item.boothownername}</td>
                                                    <td>{item.boothplace}</td>
                                                    <td>{item.boothemail}</td>
                                                    <td>{item.boothmobile}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h4 className='heading'>Orders</h4>
                            <div>
                                <table className='table text-center'>
                                    <thead>
                                        <tr>
                                            <th>MilkBooth ID</th>
                                            <th>MilkBooth Owner Name</th>
                                            <th>MilkBooth Phone Number</th>
                                            <th>Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderlst.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.mkid}</td>
                                                        <td>{item.boothownername}</td>
                                                        <td>{item.boothmobile}</td>
                                                        <button type='button' className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#orders1" onClick={() => handleOrder(item.mkid)}>
                                                            Orders
                                                        </button>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* <div className='modal fade' id="orders1">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='text-success'>Orders List</h4>
                            <button type='button' className='btn-close' data-bs-dismiss="modal"></button>
                        </div>
                        <div className='modal-body'>
                            <table className='table text-center'>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product ID</th>
                                        <th>Product Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productlst.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.productname}</td>
                                                    <td>{item.manageProducts.pid}</td>
                                                    <td>{item.orderqty}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='modal-footer'>
                            <input type='button' className='btn btn-warning' data-bs-dismiss="modal" value="Approve" />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
