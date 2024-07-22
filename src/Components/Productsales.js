import './Adminaccount.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'react-toastify';

export default function Productsales() {

    const [pid, setpid] = useState();
    const [pname, setpname] = useState("");
    const [salesdate, setsalesdate] = useState("");
    const [count, setcount] = useState();
    const [startdate,setstartdate]=useState("");
    const [enddate,setenddate]=useState("");
    const [salesmonth,setsalesmonth]=useState("");

    const [parameter, setparameter] = useState();

    const [productlst, setproductlst] = useState([]);

    const data = [
        {
            counts: count,
            name: pname
        }
    ]

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        axios.get("http://localhost:8080/getProducts")
            .then((res) => {
                setproductlst(res.data);
            })
    }

    function handleSales() 
    {

        if(parameter==0)
        {
            toast.error("Please Select the Choice you want");
            return;   
        }

        if (parameter == 1) 
        {

            if(pid==0)
            {  
                toast.error("Please select a product");
                return;   
            }

            if(!salesdate)
            {
                toast.error("Please select a date");
                return;   
            }

            axios.get(`http://localhost:8080/getTotalSales/${pid}/${salesdate}`)
            .then((res) => {
            if (typeof res.data === 'number')
                setcount(res.data);
            else 
            {
                toast.success(res.data);
                setcount("");
                setpname("");
                return;
            }

                axios.get(`http://localhost:8080/getParticularProduct/${pid}`)
                .then((res) => {
                    if (typeof res.data === 'string')
                        setpname(res.data);
                    else
                        toast.error(res.data);
                })

            })
        }

        else if(parameter==2)
        {

            if(pid==0)
            {  
                toast.error("Please select a product");
                return;   
            }

            if(!startdate || !enddate)
            {
                toast.error("Empty Field either Startdate or Enddate");
                return;   
            }

            axios.get(`http://localhost:8080/getTotalperweek/${startdate}/${enddate}/${pid}`)
            .then((res)=>{
                if(typeof res.data==='number')
                    setcount(res.data);
                else
                {
                    toast.success(res.data);
                    setcount("");
                    setpname("");
                    return;
                }

                axios.get(`http://localhost:8080/getParticularProduct/${pid}`)
                .then((res) => {
                    if (typeof res.data === 'string')
                        setpname(res.data);
                    else
                        toast.error(res.data);
                })

            })
        }

    }

    function clearAll() {
        setpid("");
        setsalesdate("");
        setparameter("");
        setenddate("");
        setsalesmonth("");
        setstartdate("");
    }

    return (
        <div className='container'>
            <h4 className='heading'>Product Sales Report</h4>
            <div className='row align-items-center'>
                <div className='col-9'>
                    <div className='card border-2 p-3'>
                        <div>
                            <label className='form-label'>Select the Product</label>
                            <select className='form-select border-2' onChange={(e) => setpid(e.target.value)} value={pid}>
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
                        <div>
                            <label className='form-label'>Choose the Parameter</label>
                            <select className='form-select border-2' onChange={(e) => setparameter(e.target.value)} value={parameter} >
                                <option value={0}>--Select--</option>
                                <option value={1}>Day</option>
                                <option value={2}>Custom Date</option>                    
                            </select>
                        </div>
                        <div>
                            {parameter == 1 && (
                                <div>
                                    <label className='form-label'>Select the Date</label>
                                    <input type='date' className='form-control border-2' value={salesdate} onChange={(e) => setsalesdate(e.target.value)} />
                                </div>
                            )}
                        </div>
                        <div>
                            {parameter == 2 && (
                                <div>
                                    <label className='form-label'>Start Date:</label>
                                    <input type="date" className='form-control border-2' onChange={(e)=>setstartdate(e.target.value)} value={startdate} />

                                    <label className='form-label'>End Date:</label>
                                    <input type="date" className='form-control border-2' onChange={(e)=>setenddate(e.target.value)} value={enddate} />
                                </div>
                            )}
                        </div>
                        <div>
                            {/* {parameter == 3 && (
                                <div>
                                    <label className='form-label'>Select the Date</label>
                                    <input type='date' className='form-control border-2' value={salesmonth} onChange={(e) => setsalesmonth(e.target.value)} />
                                </div>
                            )} */}
                        </div>
                        <div className='mt-2 text-end '>
                            <input type='button' className='btn btn-danger me-2' value="Clear" onClick={clearAll} />
                            <input type='button' className='btn btn-primary' value="Submit" onClick={handleSales} />
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <BarChart height={400} width={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="counts" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}
