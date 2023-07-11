import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const API_URL = 'https://autospot-backend.onrender.com/api/owners/';

function OwnerRegister() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [confirmPass, setConfirmPass] = useState();
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

    const onChangeAddress = (event) => {
      setAddress(event.target.value);
    }

    const onChangeConfirmPass = (event) => {
      setConfirmPass(event.target.value);
    }

    const goToLogin = () => {
      navigate('/owner')
    }

    const onSubmit = () => {
      if(password !== confirmPass) {
        console.log("Password not equal to confirm password")
      }
        const payload = {
            name,
            phone,
            address,
            password
        };
        fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(async res => { 
          const jsonRes = await res.json();
          if (res.status == 201 || res.status == 200) {
              console.log('Owner registered successfully!!')
              alert('Owner Registered Successfully!!')
              goToLogin()
          }else {
            alert(jsonRes.message)
        }
    })
  }
  return (
    <>
    <Header></Header>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Owner- Create new account
        </h1>
        <p>Make Space For Your Vehicle</p>
      </section>

      <section className='form'>
        <form>
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
          <button className='btn btn-block' onClick={onSubmit}>
            Submit
          </button>
        </div>
        <div>
          <p>Already have an account?</p>
          <center>
            <button onClick = {goToLogin} className='btn'>Login</button>
          </center>
        </div>
      </section>
      </>
  )
}

export default OwnerRegister