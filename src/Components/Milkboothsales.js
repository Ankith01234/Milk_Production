import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

export default function Milkboothsales() {

    const [salesqty,setsalesqty]=useState();
    const [pid,setpid]=useState();

    const [productlst,setproductlst]=useState([]);
    const [salesdata,setsalesdata]=useState([]);

    useEffect(()=>{
        getProductlist();
        getSalesData();
    },[])

    function getProductlist()
    {
        axios.get("http://localhost:8080/getProducts")
        .then((res)=>{
            setproductlst(res.data);
        })
    }

    function handleSales()
    {

        if(pid==0)
        {
            toast.error("Please Select the Product");
            return;    
        }

        if(!salesqty)
        {
            toast.error("Please Enter the Sales Count");
            return;   
        }

        var mkid=sessionStorage.getItem('userid');

        const obj={salesqty};

        axios.post(`http://localhost:8080/addSales/${mkid}/${pid}`,obj)
        .then((res)=>{
            if(res.data==="Stocks Added to the Sales Table")
            {
                toast.success(res.data);
                getSalesData();   
            }
            else
                toast.error(res.data);
        })

        clearAll();

    }

    function getSalesData()
    {
        var mkid=sessionStorage.getItem('userid');

        axios.get(`http://localhost:8080/getSales/${mkid}`)
        .then((res)=>{
            if(typeof res.data==='object')
            {
                debugger;
                console.log("-------");
                setsalesdata(res.data);
                console.log(salesdata);
            }
            else
                toast.error("Sales Data is not Retrived");
        })

    }

    function clearAll()
    {
        setpid("");
        setsalesqty("");
    }

  return (
    <div className='container'>
        <h4 className='heading'>Milk Booth Sales</h4>
        <div className='row align-items-center'>
            <div className='col-7'>
                <div className='card border-2 p-3'>
                    <div>
                        <label className='form-label'>Select the Product</label>
                        <select className='form-select border-2' onChange={(e)=>setpid(e.target.value)} value={pid} >
                            <option value={0}>--Select--</option>
                            {
                                productlst.map((item)=>{
                                    return(
                                        <option value={item.pid}>{item.productname}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label className='form-label'>Enter the Number of Quantity of Sales</label>
                        <input type='text' className='form-control border-2' onChange={(e)=>setsalesqty(e.target.value)} value={salesqty} />
                    </div>
                    <div className='text-end mt-2'>
                        <input type='button' className='btn btn-primary' value="Submit" onClick={handleSales} />
                    </div>
                    {/* <p>{salesdata[0][1]}</p> */}
                </div>
                {/* <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salesdata.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item[1]}</td>
                                        <td>{item[0]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
            </div>
            <div className='col-5'>
                <BarChart width={400} height={350} data={salesdata} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey= "[1]" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="[0]" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </div>
        </div>
    </div>
  )
}
