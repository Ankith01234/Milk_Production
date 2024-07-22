import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Forgotpassword() {

    const [val, setval] = useState();

    const [email, setemail] = useState("");

    const [otp, setotp] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        
        console.log(val);
    })

    function handleEmailSubmit() {
        axios.get(`http://localhost:8080/getEmailVerify/${email}`)
            .then((res) => {
                if (res.data === "Otp Sent Successfully") {
                    setval(1);
                    console.log(val);
                    toast.success("Otp Sent to your Email Please Check");
                }
                else
                    toast.error(res.data);
            })
    }

    function handleOkk() {

        sessionStorage.setItem("email",email);

        axios.get(`http://localhost:8080/verifyOtp/${otp}`)
        .then((res)=>{
            if(res.data==="You Entered Correct Otp")
            {
                toast.success(res.data);
                navigate("/passwordset");
            }
            else
                toast.error(res.data);
        })
        
        clearAll();

    }

    function clearAll()
    {
        setval("");
        setemail("");
        setotp("");
    }

    return (
        <div className='container'>
            <div className='text-end mb-3 mt-3'>
                <Link to="/" className='btn btn-warning'>Logout</Link>
            </div>
            <h4 className='heading'>Email Option</h4>
            <div className='card border-2 p-3'>
                <div>
                    <div>
                        <label>Enter the Email</label>
                        <input type='text' className='form-control border-2' onChange={(e) => setemail(e.target.value)} value={email} />
                    </div>
                    {
                        val == 1 && (
                            <>
                                <div>
                                    <label className='form-label'>Enter the Otp</label>
                                    <input type='text' className='form-control border-2' onChange={(e) => setotp(e.target.value)} value={otp} />
                                </div>
                                <div className='mt-3 text-end'>
                                     <input type='button' className='btn btn-warning' value="okk" onClick={handleOkk} />
                                </div>
                            </>
                        )
                    }
                    <div className='text-end mt-2'>
                        {
                            //val==0?(<input type='button' className='btn btn-warning' value="Submit" onClick={handleEmailSubmit} />):(<input type='button' className='btn btn-warning' value="okk" onClick={handleOkk} />)
                            val==1?(""):(<input type='button' className='btn btn-warning' value="Submit" onClick={handleEmailSubmit} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
