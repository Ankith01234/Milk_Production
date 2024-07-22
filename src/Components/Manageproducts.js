import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Manageproducts() {

    const [pid,setpid]=useState();
    const [productname,setproductname]=useState("");
    const [price,setprice]=useState();
    const [description,setdescription]=useState();

    const [productlst,setproductlst]=useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    function submitProduct()
    {

        if(!productname)
        {
            toast.error("Please Fill the ProductName");
            return;
        }

        if(!price)
        {
            toast.error("Please Fill the Price");
            return;    
        }

        if(!description)
        {
            toast.error("Please Fill the Description");
            return;    
        }

        const obj={pid,productname,price,description};

        axios.post("http://localhost:8080/addProducts",obj)
        .then((res)=>{
            if(res.data==="Product Already Exists")
                toast.error(res.data);
            else
            {
                toast.success(res.data);
                getProducts();     
            }
        })
        clearAll();
    }

    function getProducts()
    {
        axios.get("http://localhost:8080/getProducts")
        .then((res)=>{
            setproductlst(res.data);
        })
    }

    function clearAll()
    {
        setpid("");
        setproductname("");
        setprice("");
        setdescription("");
    }
    
    function handleEdit(item)
    {
        setpid(item.pid);
        setproductname(item.productname);
        setprice(item.price);
        setdescription(item.description);
    }

    function updateProduct()
    {
        const objs={pid,productname,price,description};

        // console.log(pid+","+productname+","+price+","+description);

        axios.put('http://localhost:8080/updateProduct',objs)
        .then((res)=>{
            if(res.data==="Product Updated Successfully")
            {
                toast.success(res.data);
                getProducts();
                clearAll();
            }
            else
                toast.error(res.data);
        })
    }

  return (
    <div className='container'>
        <h3 className='heading mb-3'>Product Items Page</h3>
        <div className='row'>
            <div className='col-4'>
                <h3 className='heading'>New Products</h3>
                <div className='card border-2 p-3'>
                    <div>
                        <label className='form-label'>Enter the Product Name</label>
                        <input type='text' className='form-control border-2' onChange={(e)=>setproductname(e.target.value)} value={productname} />
                    </div>
                    <div>
                        <label className='form-label'>Enter the Price</label>
                        <input type='text' className='form-control border-2' onChange={(e)=>setprice(e.target.value)} value={price} />
                    </div>
                    <div>
                        <label className='form-label'>Enter the Description</label>
                        <input type='text' className='form-control border-2' onChange={(e)=>setdescription(e.target.value)} value={description} />
                    </div>
                    <div className='mt-2 text-end'>
                        <input type='button' className='btn btn-primary me-2' value="Submit" onClick={submitProduct} />
                        <input type='button' className='btn btn-warning' value="Update" onClick={updateProduct} />
                    </div>
                </div>
            </div>
            <div className='col-8'>
                <h3 className='heading'>Product Lists</h3>
                <table className='table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productlst.map((item,index)=>(
                                <tr key={index}>
                                    <td>{item.pid}</td>
                                    <td>{item.productname}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><input type='button' className='btn btn-warning' value='Edit' onClick={()=>handleEdit(item)} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
