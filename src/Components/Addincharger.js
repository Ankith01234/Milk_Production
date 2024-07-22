import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import { toast } from 'react-toastify';

export default function Addincharger() {

    const [areaid, setareaid] = useState();
    const [inchargername, setinchargername] = useState("");
    const [inchargerid, setinchargerid] = useState();
    const [inpassword, setinpassword] = useState();
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");

    const [inchargerlst,setinchargerlst]=useState([]);

    const [arealst, setarealst] = useState([]);

    useEffect(() => {
        getAllArea();
        getAllIncharger();
    }, [])

    function getAllArea() {
        axios.get("http://localhost:8080/getArea")
            .then((res) => {
                setarealst(res.data);
            })
    }

    function submitIncharger() {

        // console.log(areaid + "," + inchargerid + "," + inchargername + "," + inpassword + "," + mobile + "," + email);

        if (areaid === 0 || !inchargername || !mobile || !email) {
            toast.error("Please Fill the Empty Fields");
            return;
        }

        const obj = { areaid, inchargerid, inchargername, inpassword, mobile, email };

        axios.post(`http://localhost:8080/addIncharger/${areaid}`, obj)
            .then((res) => {
                toast.success(res.data);
                getAllIncharger();
                clearAll();
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
                toast.error("An error occurred. Please try again later.");
            });

    }

    function getAllIncharger()
    {
        axios.get("http://localhost:8080/getIncharger")
            .then((res) => {
                setinchargerlst(res.data);
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
                toast.error("An error occurred. Please try again later.");
            });
    }

    function clearAll()
    {
        setareaid(0);
        setinchargername("");
        setinchargerid("");
        setinpassword("");
        setmobile("");
        setemail("");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-3'>
                    <h3 className='heading'>Manage Incharge Details</h3>
                    <div className='card border-2 p-3 areacolor'>
                        <div>
                            <div>
                                <label className='form-label'>Select the Area</label>
                                <select className='form-select border-2' onChange={(e) => setareaid(e.target.value)} value={areaid} >
                                    <option value={0}>--Select Area--</option>
                                    {
                                        arealst.map((item) => {
                                            return (
                                                <option value={item.areaid}>{item.areaname}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Incharger Name</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setinchargername(e.target.value)} value={inchargername} />
                            </div>                
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Mobile</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setmobile(e.target.value)} value={mobile} />
                            </div>
                            <div className='mt-2'>
                                <label className='form-label'>Enter the Email</label>
                                <input type='text' className='form-control border-2' onChange={(e) => setemail(e.target.value)} value={email} />
                            </div>
                            <div className='mt-2 text-end'>
                                <input type='button' className='btn btn-primary me-2' value="Submit" onClick={submitIncharger} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-9'>
                    <h3 className='heading'>Incharger Details</h3>
                    <table className='table table-striped text-center'>
                        <thead>
                            <tr>
                                <th>Incharger Name</th>
                                <th>Incharger Id</th>
                                <th>Area Name</th>
                                <th>Area Id</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inchargerlst.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.inchargername}</td>
                                            <td>{item.inchargerid}</td>
                                            <td>{item.area.areaname}</td>
                                            <td>{item.area.areaid}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.email}</td>
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
