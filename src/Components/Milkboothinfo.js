import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Milkboothinfo() {

    const [pid,setpid]=useState();
    const [orderqty,setorderqty]=useState();
    const [orderlst,setorderlst]=useState([]);

    // const [userid,setuserid]=useState("");
    const [val,setval]=useState("");

    const [productlst,setproductlst]=useState([]);

    useEffect(()=>{
        getAllProducts();
        getAllOrders();
    },[])

    function getAllProducts()
    {

        const id=sessionStorage.getItem('userid');

        setval(id);

        axios.get("http://localhost:8080/getProducts")
        .then((res)=>{
            setproductlst(res.data);
        })
    }

    // function handleLogout()
    // {
    //     sessionStorage.removeItem('userid');
    // }

    function handleSubmit()
    {

        if(!pid)
        {
            toast.error("Please Select a Product");
            return;   
        }

        if(!orderqty)
        {
            toast.error("Please Enter Order Quantity");
            return;   
        }

        const obj={orderqty};

        var userid=sessionStorage.getItem('userid');

        axios.post(`http://localhost:8080/addOrders/${pid}/${userid}`,obj)
        .then((res)=>{
            if(res.data==="Order Placed Successfully")
                toast.success(res.data);
            else
                toast.error(res.data);
            getAllOrders();
        })

        // axios.post(`http://localhost:8080/addOrderDetails/${pid}/${userid}`,obj)
        // .then((res)=>{
        //     if(res.data==="Data Stored in the Order Details")
        //         toast.success(res.data);
        //     else
        //         toast.error(res.data);
        // })

        clearAll();
    }

    function clearAll()
    {
        setpid("");
        setorderqty("");
    }

    function getAllOrders()
    {

        // console.log(typeof userid);
        // console.log(userid);

        var userid=sessionStorage.getItem('userid');

        axios.get(`http://localhost:8080/getOrders/${userid}`)
        .then((res)=>{
            setorderlst(res.data);
        }).catch((error) => {
            console.error("Error fetching orders:", error);
        })
    }

    return (
        <div className='container'>
            <div>
                <div className='row'>
                    <div className='col-4'>
                        <h4 className='heading'>Select Your Order</h4>
                        <div className='card border-2 p-3'>
                            <div>
                                <div>
                                    <label className='form-label'>Your Milk Booth ID</label>
                                    <input type='text' className='form-control' value={val} />
                                </div>
                                <div className='mt-2'>
                                    <label>Select the Product</label>
                                    <select className='form-select border-2' onChange={(e) => setpid(e.target.value)} value={pid} >
                                        <option value={0}>--Select--</option>
                                        {
                                            productlst.map((item) => {
                                                return (
                                                    <option value={item.pid}>{item.productname}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='mt-2'>
                                    <label className='form-label'>Enter the Quantity</label>
                                    <input type='text' className='form-control border-2' onChange={(e) => setorderqty(e.target.value)} value={orderqty} />
                                </div>
                                <div className='mt-2 text-end'>
                                    <input type='button' className='btn btn-primary' value='Submit' onClick={handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <h4 className='heading'>Your Orders</h4>
                        <div className='text-center'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>OrderID</th>
                                        <th>ProductID</th>
                                        <th>Product Name</th>
                                        <th>Order Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderlst.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.orderid}</td>
                                                    <td>{item.manageProducts.pid}</td>
                                                    <td>{item.manageProducts.productname}</td>
                                                    <td>{item.orderqty}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
