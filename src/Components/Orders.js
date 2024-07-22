import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Orders() {

    const [orderlst, setOrderlst] = useState([]);

    const [mkorderlst, setmkorderlst] = useState([]);

    const [boothownername,setboothownername]=useState("");

    // const [mkbid, setmkbid] = useState("");

    const [msg, setmsg] = useState("");

    const [para,setpara]=useState("");

    useEffect(() => {
        getOrdersList();
    }, [])

    function getOrdersList() {
        var icid = sessionStorage.getItem('userid');
        axios.get(`http://localhost:8080/getOrderLists/${icid}`)
            .then((res) => {
                if (typeof res.data == 'object') {
                    setOrderlst(res.data);
                    toast.success(res.data);
                }
                else
                    toast.error(res.data);
            })
    }

    function handleChange(e) {
        setboothownername(e.target.value);

        console.log(typeof boothownername);

        // axios.get(`http://localhost:8080/getOrderMilkBooth/${mkbid}`)
        // .then((res)=>{
        //     if(res.data==='object')
        //     {
        //         setmkorderlst(res.data);
        //         toast.success(res.data);
        //     }   
        //     else
        //         toast.error(res.data);
        // })
        // .catch((error) => {
        //     console.error('Error fetching data:', error);
        //     toast.error('Error fetching data. Please try again later.');
        // })
    }

    function handleGet() 
    {
        axios.get(`http://localhost:8080/getOrderMilkBooth/${boothownername}`)
            .then((res) => {
                if (typeof res.data === 'object') {
                    setmkorderlst(res.data);
                    toast.success(res.data);
                    console.log(mkorderlst);
                }
                else {
                    toast.error(res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data. Please try again later.');
            })
    }

    function handleApproval(orderid)
    {   
        
        axios.post(`http://localhost:8080/addSingleOrder/${orderid}`)
        .then((res)=>{
            if(res.data==="Data Stored in the MilkBooth Stocks" || res.data==="Data Updated in the Milk Booth Stocks")
            {
                setmsg(res.data);
                setpara(res.data);
                toast.success(res.data);
                handleGet();
            }
            else
            {
                //console.log("-----");
                setmsg(res.data);
                toast.error(res.data);
                axios.delete(`http://localhost:8080/deleteSingleOrder/${orderid}`)
                .then((res)=>{
                    if(res.data==="Data Deleted In the Data Base")
                    {
                        setpara(res.data);
                        handleGet();
                    }
                    else
                        toast.error(res.data);
                })
                return;
                
            }

            axios.put(`http://localhost:8080/updateOrder/${orderid}`)
            .then((res)=>{
                if(res.data==="Status updated from pending to approved" )
                {
                    getOrdersList();
                    handleGet();
                }
                else
                    toast.error(res.data);
                })

        })

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-4'>
                    <h4 className='heading'>Orders</h4>
                    <div className='card border-2 p-3 '>
                        <div>
                            <div>
                                <label className='form-label'>Select Orders</label>
                                <select className='form-select border-2' onChange={handleChange} value={boothownername} >
                                    <option value={0}>--Select--</option>
                                    {
                                        orderlst.map((item) => {
                                            return (
                                                <option>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mt-3 text-end'>
                                <input type="button" className='btn btn-primary' value='GetOrders' onClick={handleGet} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <h4 className='heading'>Orders List</h4>
                    <div>
                        <div className='card border-2 p-3'>
                            <table className='table text-center'>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Product Quantity</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mkorderlst.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.manageProducts.pid}</td>
                                                    <td>{item.manageProducts.productname}</td>
                                                    <td>{item.orderqty}</td>
                                                    <td>
                                                        <input type='button' className='btn btn-warning' value='Approve' onClick={()=>handleApproval(item.orderid)} />  
                                                    </td>
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
