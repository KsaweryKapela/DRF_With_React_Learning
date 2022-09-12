import {useState} from 'react'
import axios from "axios";

const useForm = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const [isRegistered, setRegistered] = useState(false)

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
        axios.post('/register-user', {
            username: values.username,
            email: values.email,
            password: values.password,
            password2: values.password2
        })
            .then(res => {
                if (res.data.validated) {
                    setRegistered(true)
                } else {
                setErrors({
                    'username': res.data.username,
                    'email': res.data.email,
                    'password': res.data.password,
                    'password2': res.data.password2
                })}
            })
    }

    return { handleChange, values, handleSubmit, errors, isRegistered }
}

export default useForm