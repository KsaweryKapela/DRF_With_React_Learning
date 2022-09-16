import React, {useState} from 'react'
import axios from "axios";
import getCookie from "../../csrfToken/getCookie";
import toDosForm from "../toDosForm";

export default function TechEdit(tech) {
    const {UpdateTech, usersTech, formOnClick, TechInput, setTechInput, csrftoken} = toDosForm()
    const [isClicked, setIsClicked] = useState(false);

    const handleInputChange = (event) => setTechInput({TechInput, name: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "patch",
             url: "http://127.0.0.1:8000/edit-tech/",
             data: {name: TechInput.name,
                    old_name: tech.tech_name},
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})


        if (TechInput.name.trim() === ''){
            return window.location.reload()
        }
        setIsClicked(!isClicked)

    }}

    return (
        <>
            {!isClicked &&
            <h1 onClick={() => setIsClicked(!isClicked)}>{tech.tech_name}</h1>}

            {isClicked &&

             <input className='tech-edit-input'
                    onChange={handleInputChange}
                    onKeyDown={handleKeypress}
                    onFocus={(e) => formOnClick(e)}
                    autoFocus
                    onMouseLeave={() => setIsClicked(!isClicked)}
             /> }</>
    )}