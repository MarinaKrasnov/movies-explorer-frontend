import React from 'react'
import { Route } from 'react-router-dom'
import './Login.css'
import logo from '../../images/logo.svg'

const Login = ({ onLogin }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  })
  /*   const [message, setMessage] = React.useState('') */

  const handleChange = e => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (onLogin && inputs.email && inputs.password) {
      onLogin(inputs.email, inputs.password)
    }
  }
  return (
    <Route path='/signin'>
      <div className='form__container'>
      <form onSubmit={handleSubmit} className='form'>
      <img src={logo} alt='Logo'/>
        <p className='form__title'>Рады видеть!</p>
        {/*         <p className='register__error'>{inputs.message}</p> */}
        <label for='email'
        className='form__label'>
        E-mail</label>
        <input
          id='email'
          name='email'
          type='email'
          value={inputs.email}
          onChange={handleChange}
          className='form__input'
          placeholder='pochta@yandex.ru'
        />
           <label for='password'
        className='form__label'>
        Пароль</label>
        <input
          id='password'
          name='password'
          type='password'
          value={inputs.password}
          onChange={handleChange}
          className='form__input'
          placeholder='Пароль'
        />
        <div className='form__button-container'>
          <button type='submit' className='form__submit'>
            Войти
          </button>
        </div>
      </form>
      
          </div>
    </Route>
  )
}

export default Login
