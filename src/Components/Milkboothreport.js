import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Milkboothreport() {

    const [arealst,setarealst]=useState([]);
    const [inchargerlst,setinchargerlst]=useState([]);
    const [milkboothlst,setmilkboothlst]=useState([]);

    const [areaid,setareaid]=useState();
    const [icid,seticid]=useState();
    const [mkid,setmkid]=useState();

    const [salesData,setsalesData]=useState([]);

    useEffect(()=>{
        getAllArea();
        getIncharger();
        getMilkBooth();
    },[])

    function getAllArea()
    {
        axios.get("http://localhost:8080/getArea")
        .then((res)=>{
            setarealst(res.data);
        })
    }

    function getIncharger()
    {
        axios.get("http://localhost:8080/getIncharger")
        .then((res)=>{
            setinchargerlst(res.data);
        })
    } 

    function getMilkBooth()
    {
        axios.get("http://localhost:8080/getAllBooth")
        .then((res)=>{
            setmilkboothlst(res.data);
        })
    }

    function handleSubmit()
    {

        if(!areaid)
        {
            toast.error("Please select the area");
            return;   
        }

        if(!icid)
        {
            toast.error("Please Select the Incharger");
            return;   
        }

        if(!mkid)
        {
            toast.error("Please Select the MilkBooth");
            return;   
        }

        axios.get(`http://localhost:8080/getSales/${mkid}`)
        .then((res)=>{
            if(typeof res.data==='object')
            {
                console.log("-----");
                setsalesData(res.data);
                console.log(salesData);
            }
            else
                toast.error(res.data);
        })
    }

  return (
    <div className='container'>
        <h3 className='heading'>MilkBooth Report</h3>
        <div className='row'>
            <div className='col-8'>
                <div className='card border-2 p-3'>
                    <div>
                        <div>
                            <label className='form-label'>Select the Area</label>
                            <select className='form-select border-2' onChange={(e)=>setareaid(e.target.value)} value={areaid} >
                                <option value={0}>--Select--</option>
                                {
                                    arealst.map((item)=>{
                                        return(
                                            <option value={item.areaid}>{item.areaname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Incharger</label>
                            <select className='form-select border-2' onChange={(e)=>seticid(e.target.value)} value={icid}>
                                <option value={0}>--Select--</option>
                                {
                                    inchargerlst.filter((item)=>(item.area.areaid==areaid)).map((item)=>{
                                        return(
                                            <option value={item.inchargerid}>{item.inchargername}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2'>
                            <label className='form-label'>Select the Milkbooth</label>
                            <select className='form-select border-2' onChange={(e)=>setmkid(e.target.value)} value={mkid}>
                                <option value={0}>--Select--</option>
                                {
                                    milkboothlst.filter((item)=>(item.incharger.inchargerid==icid)).map((item)=>{
                                        return(
                                            <option value={item.mkid}>{item.boothownername}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mt-2 text-end'>
                            <input type='button' className='btn btn-primary' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-4'>
                <BarChart width={400} height={350} data={salesData} >
                    <CartesianGrid strokeDasharray="1 1" />
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
