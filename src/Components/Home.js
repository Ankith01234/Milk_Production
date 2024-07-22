import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Adminaccount.css';
import photo1 from '../Photo-1.jpg'; 
// import './Bgcolor.css';

export default function Home() {

    const [userid, setuserid] = useState();
    const [password, setpassword] = useState("");

    const [userval,setuserval]=useState();

    const navigate=useNavigate();

    function handleAccount()
    {
        const objs={userid,password};

        axios.post("http://localhost:8080/addInfo",objs)
        .then((res)=>{
            toast.success(res.data);
        })
        clearAll();
    }

    function handleSet()
    {
        if(userval==1)
        {
            if(!userid || !password)
            {
                toast.error("Please Fill the text Field");
                return;
            }

            const obj={userid,password};

            axios.post("http://localhost:8080/getInfo",obj)
            .then((res)=>{
                if(res.data==="Login Successfully")
                {
                    toast.success(res.data);
                    navigate("/adminaccount");
                }
            else
                    toast.error(res.data);
            })
            clearAll();
        }

        if(userval==2)
        {
            sessionStorage.setItem("userid", userid);

            if(!userid)
            {
                toast.error("Please Fill the userid");
                return;
            }

            if(!password)
            {
                toast.error("Please Fill the password");
                return;
            }

            // const obj={userid,password};

            console.log(userid+","+password);

            axios.post(`http://localhost:8080/findIncharger/${userid}/${password}`)
            .then((res)=>{
                if(res.data==="Incharger Login Sucessfully")
                {
                    toast.success(res.data);
                    navigate("/incharger");
                }
                else
                    toast.error(res.data);
            })
            clearAll();
        }

        if(userval==3)
        {

            sessionStorage.setItem("userid", userid);

            if(!userid)
            {
                toast.error("Please Fill the userid");
                return;
            }

            if(!password)
            {
                toast.error("Please Fill the password");
                return;
            }

            axios.post(`http://localhost:8080/chkbooth/${userid}/${password}`)
            .then((res)=>{
                if(res.data==="You Login Successfully")
                {
                    navigate("/milkbooth");
                    toast.success(res.data);
                }
                else
                    toast.error(res.data);
            })
            clearAll();
        }

    }

    function clearAll()
    {
        setuserid("");
        setpassword("");
    }

    function handleOption(e)
    {
        setuserval(e.target.value);
    }

    function handleForgot()
    {
        navigate("/forgotpassword");
    }

    return (
        <div className='container'>
            <h3 className='heading mt-3'>Minimize Risk Dairy Milk Production</h3>
            <div className='text-center'>
                <div>
                    <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#account">
                        New Account
                    </button>
                    <div class="modal fade" id="account">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 className='text-center text-success'>Sign-Up</h3>
                                    <button type='button' className='btn-close' data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <div>
                                            <label className=''>Enter the UserId</label>
                                            <input type='text' className='form-control border-2'
                                                onChange={(e) => setuserid(e.target.value)}
                                                value={userid} />
                                        </div>
                                        <div>
                                            <label className='form-label'>Enter the Password</label>
                                            <input type='text' className='form-control border-2'
                                                onChange={(e) => setpassword(e.target.value)}
                                                value={password} />
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-footer'>                            
                                    <input type='button' className='btn btn-primary' value="Sign-Up" onClick={handleAccount}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#login">
                        Login
                    </button>
                    <div class="modal fade" id="login">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 className='text-center text-success'>Sign-In</h3>
                                    <button type='button' className='btn-close' data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <div>
                                            <label className='form-label'>Select the User</label>
                                            <select className='form-select border-2' onChange={handleOption} value={userval}>
                                                <option value={0}>--Select--</option>
                                                <option value={1}>Admin</option>
                                                <option value={2}>Incharger</option>
                                                <option value={3}>Milk Booth</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className='form-label'>Enter the UserId</label>
                                            <input type='text' className='form-control border-2'
                                                onChange={(e) => setuserid(e.target.value)}
                                                value={userid} />
                                        </div>
                                        <div>
                                            <label className='form-label'>Enter the Password</label>
                                            <input type='password' className='form-control border-2'
                                                onChange={(e) => setpassword(e.target.value)}
                                                value={password} />
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-footer'>                        
                                    <Link onClick={handleForgot} data-bs-dismiss="modal">Forgot Password</Link>
                                    <input type='button' className='btn btn-warning' data-bs-dismiss="modal" value="Login" onClick={handleSet} /><i class="fa-solid fa-bars"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 text-center '>
                <div className='row justify-content-center'>
                    <div className='col-6 d-flex align-items-center'>
                        <div className='card border-primary p-3 border-2'>
                            <p>Milking is typically done using mechanized milking machines. The process involves cleaning the udders, attaching milking machines, and then collecting the milk. </p>
                            <p>Dairy farming can have environmental impacts such as methane emissions from cows and land use for feed production. Sustainable practices aim to minimize these impacts.</p>
                            <p>Processed milk is then packaged into various containers like cartons, bottles, or bags, and distributed to retailers for sale to consumers.</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <img src={photo1} alt="" className='img-fluid' style={{ height: "374px", width: "auto" }} />
                    </div>
                </div>
            </div>
            <div>
                <div className='bgfooter'>
                    <p>Milk preservation methods have improved starting with the arrival of refrigeration technology in the late 19th century, which included direct expansion refrigeration and the plate heat exchanger. These cooling methods allowed dairy farms to preserve milk by reducing spoiling due to bacterial growth and humidity.There has been substantial concern over the amount of waste output created by dairy industries, seen through manure disposal and air pollution caused by methane gas. The industry's role in agricultural greenhouse gas emissions has also been noted to implicate environmental consequences. Various measures have been put in place in order to control the amount of phosphorus excreted by dairy livestock. The usage of rBST has also been controversial. Dairy farming in general has been criticized by animal welfare activists due to the health issues imposed upon dairy cows through intensive animal farming. </p>
                </div>
            </div>
        </div>
    )
}
