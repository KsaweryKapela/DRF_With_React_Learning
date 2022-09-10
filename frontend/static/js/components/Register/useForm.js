import {useState, useEffect} from 'react'
import validateData from './validateData'
import axios from "axios";

const useForm = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(validateData(values))
        if (Object.keys(validateData(values)).length === 0) {
        checkDatabase()
        }
        // document.getElementById('register-form').submit()}
  }

    function checkDatabase() {
        axios.post('/register-user', {
          username: values.username,
          email: values.email,
          password: values.password})
        .then((response) => {
          console.log(response.data.response)})
    }

    return { handleChange, values, handleSubmit, errors }
}

export default useForm