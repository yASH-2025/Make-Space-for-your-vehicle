import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function HeaderIn({view, pastBookings}) {

    const logout = () => {
        Cookies.remove('phoneCust')
        Cookies.remove('tokenCust')
    }
    
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>AutoSpot</Link>
        </div>
        <ul>
            <li>
                <Link to = '/customer'>CUSTOMER</Link>
            </li>
            <li>
                <p className = "clickable" onClick={pastBookings}>
                    PAST BOOKINGS
                </p>
            </li>
            <li>
                <p className = "clickable" onClick={view}>
                    ONGOING BOOKINGS
                </p>
            </li>
            <li>
                <Link to='/customer ' onClick={logout}>
                    <FaUser /> LOGOUT
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default HeaderIn