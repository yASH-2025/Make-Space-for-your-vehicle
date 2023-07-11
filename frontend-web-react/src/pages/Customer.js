import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Owner from './Owner'
import {Link} from 'react-router-dom'
import { API_CUST_LOGIN } from '../apis/apis'
import axios from 'axios'
import Cookies from "js-cookie";
import Header from '../components/Header'
import profileLogo from '../assets/profile.png'

function Customer() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);

    const toggle = () => {
      if(refresh)
        setRefresh(false);
      else
        setRefresh(true);
    }

    // Method to get data from cookies
    const GetCookie = () => {
      return [Cookies.get("tokenCust"), Cookies.get("phoneCust")];
    };

    useEffect(()=>{
      // console.log(API_CUST_LOGIN);
      let cookieData = GetCookie();
      console.log(cookieData)

      if(cookieData[0] !== undefined && cookieData[1] !== undefined){
        navigate('/bookings');
      }
    },[refresh])

    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();

    const onChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const redirectTo = () => {
      console.log('pushing')
      navigate("/customerRegister");
    }

    const onSubmit = async(e) => {
      setLoading(true);
      const credentials = {phone, password};
      e.preventDefault();
      
      fetch(`${API_CUST_LOGIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        }).then((response) => {
            if(response.status === 200){
              console.log('logged In Successfully')
              return response.json()
            }
            else{
              console.log('Wrong Id or Password')
              alert('Incorrect Phone Number/Password');
              return null;
            }
            
          }).then((data) => {
            if(data){
              console.log(data)
              SetCookie(data)
              navigate('/bookings');
              setLoading(false);
            }
          })
        }

    //setting token and user phone number in cookies:
    const SetCookie = async(data) => {
      Cookies.set("tokenCust", data.token, {
        expires: 7,
      });
      Cookies.set("phoneCust", data.phone, {
        expires: 7,
      });

      toggle();
    };

  return (
    <>
    <Header />
  {loading?
    <center><div className='loadingSpinner'></div></center>
    :null}
      <section className='heading'>
        <p>Make Space For Your Vehicle</p>
        <br></br>
        <h1>
          <FaSignInAlt /> Customer Login
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='tel'
              className='form-control'
              id='phone'
              value={phone}
              placeholder='Enter your phone number'
              onChange={onChangePhone}
            />
          </div>
          <div className='form-group'>
            <input
              required
              type='password'
              className='form-control'
              id='password'
              value={password}
              placeholder='Enter password'
              onChange={onChangePassword}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
          <div>
            <p>Don't have an account?</p>
            <center>
              <button onClick={redirectTo} className='btn'>
                Register
              </button>
            </center>
          </div>
      </section>
      </>
  )
}

export default Customer