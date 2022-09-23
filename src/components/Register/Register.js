import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Register.css'
import  logo  from '../../images/logo.svg'

const Register = ({ onRegister }) => {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (onRegister && state.email) {
      onRegister(state.name,state.email, state.password)
    }
  }

  return (
    <Route path='/signup'>
      <div className='form__container'>
      <form onSubmit={handleSubmit} className='form'>
        <img src={logo} alt='Logo'/>
        <p className='form__title'>Добро пожаловать!</p>
        <p className='register__error'>{state.message}</p>
        <label for='name'
        className='form__label'>
        Имя</label>
        <input
          id='name'
          name='name'
          type='name'
          value={state.name}
          onChange={handleChange}
          className='form__input'
          placeholder='Виталий'
        />
          <label for='email'
        className='form__label'>
        E-mail</label>
        <input
          id='email'
          name='email'
          type='email'
          value={state.email}
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
          value={state.password}
          onChange={handleChange}
          className='form__input'
          placeholder='Пароль'
        />
        <div className='form__button-container'>
          <button type='submit' className='form__submit'>
            Зарегистрироваться
          </button>
          <div className='form__sign-in-up'>
            <p className='form__text-below-submit'>Уже зарегистрированы? </p>
            <Link to='signin' className='link form__link form__link-below-submit '>
              Войти
            </Link>
          </div>
        </div>
      </form>
          </div>
    </Route>
  )
}

export default Register
