import React from 'react'
import useForm from './useForm'
import ScreenAfterRegister from './ScreenAfterRegister'

export default function SingUpForms() {

    const {handleChange, values, errors, isRegistered, handleSubmit} = useForm()

    if(isRegistered){
        return (<div>
                <ScreenAfterRegister {...values}/>
            </div>
        )
    }

    return (
        <div className='sign-up-forms' >
            <form id='register-form' action='/register-user' method="get" onSubmit={handleSubmit}>
                 <div className='form-inputs'>
                     <label htmlFor='username' className='form-label'>
                         <p>Username</p>
                         <input type='text'
                                id='username'
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                                className='form-input'
                                placeholder='Enter your username'
                                autoComplete='username'/>
                     </label>
                     { errors.username &&  <span>{' ' + errors.username}</span>}
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
                     { errors.email && <span>{' ' + errors.email}</span>}
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
                     { errors.password &&  <span>{' ' + errors.password}</span>}
                     <label htmlFor='password2' className='form-label'>
                         <p>Confirm password</p>
                         <input type='password'
                                id='password2'
                                name='password2'
                                value={values.password2}
                                onChange={handleChange}
                                className='form-input'
                                placeholder='Confirm your password'
                                autoComplete='new-password'/>
                     </label>

                     { errors.password2 &&  <span>{' ' + errors.password2}</span>}
                 </div>
                <br/>
                <button className='sign-up-button'
                        type='submit'
                        id='submit-button'>
                    Sign up
                </button>
                <p> Already have an account? Login <a href='#'>here</a></p>
            </form>
       </div>
    )
}

