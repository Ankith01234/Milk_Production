import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './Adminaccount.css';

export default function Area() {

    const [areaname, setareaname] = useState("");

    const [arealst,setarealst]=useState([]);

    useEffect(()=>{
        getAreas();
    },[])

    function handleSubmit() {
        const obj = { areaname };

        axios.post("http://localhost:8080/addArea", obj)
            .then((res) => {
                if (res.data === "Area Name Already Exists")
                    toast.error(res.data);
                else
                    toast.success(res.data);
            })
        setareaname("");
    }

    function getAreas()
    {
        axios.get("http://localhost:8080/getArea")
        .then((res)=>{
            setarealst(res.data);
        })
    }

    return (
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-6'>
                    <h3 className='heading'>Area Details</h3>
                    <div className='card border-2 p-3'>
                        <div>
                            <label className='form-label'>Enter the Area Name</label>
                            <input type='text' className='form-control border-2' value={areaname} onChange={(e) => setareaname(e.target.value)} />
                        </div>
                        <div className='text-end mt-2'>
                            <input type='button' className='btn btn-primary' value="Submit" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
                <div className='col-6'> 
                    <h3 className='heading'>Number of Areas</h3>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Area ID</th>
                                <th> Area Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arealst.map((item)=>{
                                    return(
                                        <tr>
                                            <td>{item.areaid}</td>
                                            <td>{item.areaname}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
