import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Owner from './Owner'
import axios from 'axios'
import { API_CUST_REGISTER } from '../apis/apis'
import Header from '../components/Header'

function CustomerRegister() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [pincode, setPincode] = useState();
    const [password, setPassword] = useState();

    const onChangeName = (event) => {
      setName(event.target.value);
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onChangePincode = (event) => {
        setPincode(event.target.value);
    }

    const onChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const onChangeConfirmPass = (event) => {
        setConfirmPass(event.target.value);
    }

    const redirectTo = () => {
      navigate('/customer')
    }

    const onSubmit = async() => {
        if(name === '' || phone === '' || password === '' || confirmPass === '' || address === '' || pincode === ''){
          alert('All fields are mandatory for submission.');
          return;
        }
        else{
          if(password !== confirmPass){
            console.log('Password Mismatch')
            alert('Password Mismatch');
            return;
          }

          let customer = {
            name,
            phone,
            address,
            password,
            pincode
            // confirmPass: confirmPass
          }
          // customer = JSON.stringify(customer);
          // console.log(customer)
            await axios.post(`${API_CUST_REGISTER}`, customer)
            .catch((error)=>{
              console.log(error);
              alert('Phone number already exists. Please try again with different phone number');
            })
            .then(()=>{
              navigate('/customer');
            })
        }
    }
  return (
    <>
    <Header></Header>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Customer- Create new account
        </h1>
        <p>Make Space For Your Vehicle</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your name'
              onChange={onChangeName}
            />
          </div>
          <div className='form-group'>
            <input
              type='tel'
              className='form-control'
              placeholder='Enter your phone number'
              onChange={onChangePhone}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your address'
              onChange={onChangeAddress}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your pincode'
              onChange={onChangePincode}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Enter password'
              onChange={onChangePassword}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Re-enter password'
              onChange={onChangeConfirmPass}
            />
          </div>
        </form>
        <div className='form-group'>
          <button onClick = {onSubmit} className='btn btn-block'>
            Submit
          </button>
        </div>
        <div>
          <p>Already have an account?</p>
          <center>
            <button onClick = {redirectTo} className='btn'>Login</button>
          </center>
        </div>
      </section>
      </>
  )
}

export default CustomerRegister