import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useState} from 'react'

function Header() {
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>AutoSpot</Link>
        </div>
        <ul>
            <li>
                <Link to='/owner'>
                    <FaUser /> Owner
                </Link>
            </li>
            <li>
                <Link to='/customer'>
                    <FaUser /> Customer
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header