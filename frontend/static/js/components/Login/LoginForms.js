import React, {useEffect, useState} from 'react'
import loginUseForm from "./LoginUseForm";
import axios from "axios";

export default function LoginForms() {

        const {handleChange, values, errors, handleSubmit, loading } = loginUseForm()

    const [alreadyLogged, setAlreadyLogged] = useState();

    useEffect(() => {
        async function fetchData() {
    return axios('/user-state')}
    fetchData().then(r => setAlreadyLogged(r.data['is_logged']))}, [])

    if (alreadyLogged) {
        return (<div>You are already logged in.
            <p>
                <a href="/logout">
                    <button>Log out</button>
                </a>
            </p>
        </div>)
    } else if (loading) {
        return (<div>loading</div>)
    }

    return (
        <div className='login-forms'>
            <form id='login-form' action='/login-user' method="post" onSubmit={handleSubmit}>
                <div className='form-inputs'>
                    <label htmlFor='email' className='form-label'>
                        <p>Email</p>
                        <input type='text'
                               id='email'
                               name='email'
                               value={values.email}
                               onChange={handleChange}
                               className='form-input'
                               placeholder='Enter your email'
                               autoComplete='email'/>
                    </label>
                    {errors.email && <span>{' ' + errors.email}</span>}
                    <label htmlFor='password' className='form-label'>
                        <p>Password</p>
                        <input type='password'
                               id='password'
                               name='password'
                               value={values.password}
                               onChange={handleChange}
                               className='form-input'
                               placeholder='Enter your password'
                               autoComplete='new-password'/>
                    </label>
                    {errors.password && <span>{' ' + errors.password}</span>}
                </div>
                <br/>
                <button className='sign-up-button'
                        type='submit'
                        id='submit-button'>
                    Login
                </button>
            </form>
          <p> Or register <a href='/register'>here</a></p>
        </div>
    )
}