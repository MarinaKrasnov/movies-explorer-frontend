import React from 'react'
import logo from '../images/logo.svg'
import Footer from './Footer.css'

function Footer ({ children, className }) {
  return (
    <Footer className={`footer ${className}`}>
      <img className='footer__logo' src={logo} alt='Логотип' />
          {children}
          <button className='footer__button'>Акаунт</button>
    </Footer>
  )
}

export default Footer
