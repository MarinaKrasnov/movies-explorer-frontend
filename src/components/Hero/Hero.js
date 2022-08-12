import React from 'react'
import logo from '../images/logo.svg'
import Hero from './Hero.css'

function Hero ({ children, className }) {
  return (
    <Hero className={`Hero ${className}`}>
      <img className='hero__logo' src={logo} alt='Логотип' />
          {children}
          <button className='hero__button'>Акаунт</button>
    </Hero>
  )
}

export default Hero
