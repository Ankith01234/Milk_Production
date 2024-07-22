import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// import index from 'toastify';

export default function Productproduction() {

    const [pid, setpid] = useState();
    const [quantity, setquantity] = useState();

    const [productlst, setproductlst] = useState([]);

    const [productionlst, setproductionlst] = useState([]);

    useEffect(() => {
        getAllProducts();
        getAllProductions();
    }, []);

    function getAllProducts() {
        axios.get("http://localhost:8080/getProducts")
            .then((res) => {
                setproductlst(res.data);
            })
    }

    function handleProduction() 
    {

        if(pid==0)
        {
            toast.error("Please select a product");
            return;   
        }

        if(!quantity)
        {
            toast.error("Please enter quantity");
            return;   
        }

        const obj = { quantity }

        axios.post(`http://localhost:8080/addProduction/${pid}`, obj)
            .then((res) => {
                if (res.data === "Production saved successfully") {
                    toast.success(res.data);
                    getAllProductions();
                }
                else
                    toast.error(res.data);
            })

        clearAll();
    }

    function clearAll() {
        setpid(0);
        setquantity("");
    }

    function getAllProductions() {
        axios.get("http://localhost:8080/getProductions")
            .then((res) => {
                setproductionlst(res.data);
            })
    }

    // function handleDelete(id)
    // {
    //     axios.delete(`http://localhost:8080/deleteProduction/${id}`)
    //     .then((res)=>{
    //         if(res.data==="Production Deleted Successfully")
    //             toast.success(res.data);
    //         else
    //             toast.error(res.data);
    //     })
    // }

    return (
        <div className='container'>
            <div>
                <div className='row'>
                    <div className='col'>
                        <h4 className='heading'>Add New Productions</h4>
                        <div className='card border-2 p-3'>
                            <div>
                                <label>Select the Products</label>
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
                                <input type="text" className='form-control border-2' onChange={(e) => setquantity(e.target.value)} value={quantity} />
                            </div>
                            <div className='text-end mt-2'>
                                <input type="button" className='btn btn-primary' value="Submit" onClick={handleProduction} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-4 mb-5 align-items-center'>
                    <div className='col-8'>
                        <h3 className='heading mb-3'>Product Productions</h3>
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Production Date</th>
                                    <th>Quantity</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productionlst.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.products.productname}</td>
                                                <td>{item.productiondate}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.balance}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-4'>
                        <BarChart height={400} width={300} data={productionlst}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="products.productname" />
                            <XAxis dataKey="productiondate" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="balance" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    )
}
