import axios from "axios";
import useForm from './useForm'
import {useState} from "react";

export default function validateData(values) {

    let errors = {}
    if(!values.username.trim()) {
        errors.username = "Username required"
    }

    if(!values.email.trim()) {
        errors.email = "Email required"
    } else if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid"
    }

    if(!values.password.trim()) {
        errors.password = 'Password required'
    } else if(values.password.length < 6) {
        errors.password = 'Password should have at least 6 characters'
    }

    if(!values.password2.trim()) {
        errors.password2 = 'Password is required'
    } else if (values.password2 !== values.password) {
        errors.password2 = "Passwords don't match"
    }

    if (Object.keys(errors).length === 0) {
        errors.checkBackend = true
    }

    return errors;
}