import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Adminaccount.css';

export default function Passwordset() {

    const [newpassword,setnewpassword]=useState();
    const [confirmpassword,setconfirmpassword]=useState();

    const navigate=useNavigate();

    function handleSubmit()
    {
        var email=sessionStorage.getItem('email');

        if(newpassword==confirmpassword)
        {
            axios.put(`http://localhost:8080/updatePassword/${email}/${newpassword}`)
            .then((res)=>{
                if(res.data==="Password Changed Successfully")
                {
                    toast.success(res.data);
                    navigate("/");
                    sessionStorage.removeItem('email');
                }
                else
                    toast.error(res.data);
            })   
        }
        else
            toast.error("Both Password Mismatch");

        clearAll();

    }

    function clearAll()
    {
        setconfirmpassword("");
        setnewpassword("");
    }


  return (
    <div className='container'>
        <h4 className='heading'>Enter Your New Password</h4>
        <div className='card border-2 p-3'>
            <div>
                <label className='form-label'>Enter the New Password</label>
                <input type="text" className='form-control border-2' onChange={(e)=>setnewpassword(e.target.value)} value={newpassword} />
            </div>
            <div>
                <label className='form-label'>Confirm Password</label>
                <input type="password" className='form-control border-2' onChange={(e)=>setconfirmpassword(e.target.value)} value={confirmpassword} />
            </div>
            <div className='mt-2 text-end'>
                <input type='button' className='btn btn-primary' value='Submit' onClick={handleSubmit} />
            </div>
        </div>
    </div>
  )
}
