import React from 'react'
import logo from '../images/logo.svg'
import Header from './Header.css'

function Header ({ children, className }) {
  return (
    <header className={`header ${className}`}>
      <img className='header__logo' src={logo} alt='Логотип' />
          {children}
          <button className='header__button'>Акаунт</button>
    </header>
  )
}

export default Header
