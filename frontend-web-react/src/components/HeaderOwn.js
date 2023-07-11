import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
function HeaderOwn() {
    const logout = () => {
        Cookies.remove('phoneOwner')
        Cookies.remove('tokenOwner')
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>AutoSpot</Link>
        </div>
        <ul>
            <li>
                OWNER
            </li>
            <li>
                <Link to='/owner ' onClick={logout}>
                    <FaUser /> LOGOUT
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default HeaderOwn