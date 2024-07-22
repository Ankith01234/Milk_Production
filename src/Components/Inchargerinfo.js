import React, { useEffect, useState } from 'react'
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Inchargerinfo() {

    const [inchargerid, setinchargerid] = useState("");

    const [boothownername, setboothownername] = useState("");
    const [boothplace, setboothplace] = useState("");
    const [boothemail, setboothemail] = useState("");
    const [boothmobile, setboothmobile] = useState("");

    const [milkboothlst, setmilkboothlst] = useState([]);

    useEffect(() => {
        getBooth();
    }, [])

    function handleBooth() 
    {

        if(!boothownername)
        {
            toast.error("Please Enter the Boothowner Name");
            return;
        }

        if(!boothplace)
        {
            toast.error("Please Enter the Booth Place");
            return;
        }

        if(!boothemail)
        {
            toast.error("Please Enter the Booth Email");
            return;
        }

        if(!boothmobile)
        {
            toast.error("Please Enter the Booth Mobile");
            return;
        }

        const obj = { boothownername, boothplace, boothemail, boothmobile };

        axios.post(`http://localhost:8080/addMilkBooth/${inchargerid}`, obj)
        .then((res) => {
            if (res.data === "MilkBooth Added Successfully")
            {
                toast.success(res.data);
                getBooth();
            }
            else
                toast.error(res.data);
        })

        clearAll();

    }

    function clearAll()
    {
        setboothownername("");
        setboothplace("");
        setboothemail("");
        setboothmobile("");
    }

    function getBooth() {
        var icid = sessionStorage.getItem('userid');
        setinchargerid(icid);
        axios.get(`http://localhost:8080/getBooth/${icid}`)
        .then((res) => {
            setmilkboothlst(res.data);
        })
    }

    return (
        <div className='container'>
            <div>
                <div className='row'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}
