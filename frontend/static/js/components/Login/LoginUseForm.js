import {useState} from 'react'
import axios from "axios";

const loginUseForm = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const [loading, setLoading] = useState(false)


    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        axios.post('/login-user', {
            email: values.email,
            password: values.password,
        })
            .then(res => {
                console.log(res)
                if (res.data['logged'] === true) {
                    window.location.href = '/';
                } else {
                setErrors({
                    'email': res.data.email,
                    'password': res.data.password,
                })
                setLoading(false)
                }

            })
    }


    return { handleChange, values, handleSubmit, errors, loading }
}

export default loginUseForm