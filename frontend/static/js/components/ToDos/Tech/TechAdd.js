import React, {useState} from 'react'
import axios from "axios";
import getCookie from '../../csrfToken/getCookie'
import toDosForm from '../toDosForm'
import RenderToDos from "../RenderToDos";


export default function TechAdd() {

    const {setTechInput, TechInput, csrftoken} = toDosForm()

    const handleInputChange = (event) => setTechInput({TechInput, name: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "post",
             url: "http://127.0.0.1:8000/edit-tech/",
             data: {name: TechInput.name},
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})

      setTechInput({TechInput, name: ''})
      window.location.reload()
    }}

    return (
        <>
            <input className='add-tech-label'
                   value={TechInput.name}
                   placeholder='New tech'
                   onChange={handleInputChange}
                   onKeyDown={handleKeypress}
            />
       </>
    )
}