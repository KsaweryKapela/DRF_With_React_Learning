import React, {useState} from 'react'
import axios from "axios";
import getCookie from '../../csrfToken/getCookie'
import toDosForm from "../toDosForm";


export default function TaskAdd(tech) {

    const {setTechInput, TechInput, formOnClick} = toDosForm()

    const [values, setValues] = useState({
        PL: ''
    });

    const csrftoken = getCookie('csrftoken');

    const handleInputChange = (event) => setValues({values, PL: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "post",
             url: "http://127.0.0.1:8000/edit-todos/",
             data: {language: tech.Tech_ID,
                    name: values.PL,
                    description: 'Description of ' + values.PL,
                    done: false},
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})

      setValues({values, PL: ''})
      window.location.reload();
    }}

    return (
        <div>
            <hr/>
            <input value={values.PL}
                   placeholder='Add new task'
                   onChange={handleInputChange}
                   onKeyDown={handleKeypress}
                   onClick={(e) => formOnClick(e)}
            />
        </div>
    )
}