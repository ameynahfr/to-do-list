import React from 'react'
import Logo from './list.svg'
const Navbar = () => {
  return (
    <div className='nav'>
        <img className='logo' src={Logo} alt='list'></img>
        <span className='title'>Today's Tasks</span>
    </div>
  )
}

export default Navbar