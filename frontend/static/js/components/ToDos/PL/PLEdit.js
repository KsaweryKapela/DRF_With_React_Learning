import React, {useState} from 'react'
import axios from "axios";
import formOnClick from "../formOnClick";
import getCookie from "../../csrfToken/getCookie";

export default function PLEdit(tech) {

    const csrftoken = getCookie('csrftoken');

    const [isClicked, setIsClicked] = useState(false);

    const [values, setValues] = useState({
        PL: tech.tech_name});

    const handleInputChange = (event) => setValues({values, PL: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "patch",
             url: "http://127.0.0.1:8000/edit-PL/",
             data: {name: values.PL,
                    old_name: tech.tech_name},
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})


        if (values.PL.trim() === ''){
            return window.location.reload()
        }
        setIsClicked(!isClicked)

    }}

    return (
        <>
            {!isClicked &&
            <h1 onClick={() => setIsClicked(!isClicked)}>{values.PL}</h1>}

            {isClicked &&

             <input className='tech-edit-input'
                    value={values.PL}
                    id = 'x'
                         onChange={handleInputChange}
                         onKeyDown={handleKeypress}
                    onFocus={(e) => formOnClick(e)}
                    autoFocus
                    onMouseLeave={() => setIsClicked(!isClicked)}
             /> }</>
    )}