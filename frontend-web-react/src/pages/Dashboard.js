import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import profileLogo from '../assets/profile.png'

function Dashboard() {
  return (
    <div>
      <Header />
      <section className='heading'>
        <img src = {profileLogo} className='image-style'></img>
      </section>
      <div className = "inLine">
        <div className='goal'>
        <Link to = "/customer"><h1>CUSTOMER PORTAL</h1>
          <p>Visit Customer Portal to spot parking location in your pincode area.</p>
        </Link>
        </div>

        <div className='goal'>
          <Link to = "/owner"><h1>OWNER PORTAL</h1>
            <p>Visit Owner Portal to register your property as a parking spot.</p>
          </Link>
        </div>
      
      </div>

      {/* <section className='heading'>
        <br></br>
        <p>Make Space For Your Vehicle</p>
      </section> */}

    </div>
  )
}

export default Dashboard