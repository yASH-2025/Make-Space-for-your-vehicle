import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as variables from "../apis/apis";
import Cookies from "js-cookie";
import Header from '../components/Header'

function Owner() {
    let navigate = useNavigate();
    useEffect(()=>{
      let cookieData = GetCookie();
      // console.log(cookieData)

      if(cookieData[0] !== undefined && cookieData[1] !== undefined){
        navigate('/ownerProperties', {state: {phone:cookieData[1]}});
      }
    },[])
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();

    const onChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (e) => {
      e.preventDefault();
      const payload = {
        phone,
        password
      };
      fetch(`${variables.API_OWNER_LOGIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) => {
        if(response.status === 200){
          console.log('logged In Successfully')
          return response.json()
        }
        else{
          console.log('Wrong Id or Password')
          alert('Wrong Id or Password.. Try Again!!')
          return null
        }
      }).then((data) => {
        if(data) {
          console.log(data)
          SetCookie(data)
          navigate('/ownerProperties', {state: {phone:phone}})
        }
      })
    };

    const SetCookie = (data) => {
      console.log(data)
      Cookies.set("tokenOwner", data.token, {
        expires: 7,
      });
      Cookies.set("phoneOwner", data.phone, {
        expires: 7,
      });
    };

    // Method to get data from cookies
    const GetCookie = () => {
      return [Cookies.get("tokenOwner"), Cookies.get("phoneOwner")];
    };

    const redirectTo = () => {
      navigate("/ownerRegister")
    }
  return (
    <>
        <Header />
      <section className='heading'>
      <p>Make Space For Your Vehicle</p>
      <br></br>
        <h1>
          <FaSignInAlt /> Owner Login
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='tel'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Enter your phone number'
              onChange={onChangePhone}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChangePassword}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' onClick={onSubmit}>
              Submit
            </button>
          </div>

          <div>
            <p>Don't have an account?</p>
            <center>
                <button className='btn' onClick={redirectTo}>Register</button>
            </center>
          </div>
        </form>
      </section>
    </>
  )
}

export default Owner