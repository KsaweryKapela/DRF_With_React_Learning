import React, {useState} from 'react'
import axios from "axios";
import getCookie from "../../csrfToken/getCookie";
import toDosForm from "../toDosForm";

export default function TechEdit(tech) {
    const {formOnClick, csrftoken} = toDosForm()
    const [isClicked, setIsClicked] = useState(false)

    const [techName, setTechName] = useState(tech.tech_name)
    const [oldName, setOldName] = useState('');

    const handleInputChange = (event) => setTechName(event.target.value)
    const handleKeypress = (event) => {
        if (event.keyCode === 13) {

            axios({
                method: "patch",
                url: "http://127.0.0.1:8000/edit-tech/",
                data: {
                    name: techName,
                    old_name: oldName
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                }
            })

            if (techName.trim() === '') {
                return window.location.reload()
            }

            setIsClicked(!isClicked)
        }
    }

    return (
        <>
            {!isClicked &&
                <h1 onClick={() => setIsClicked(!isClicked)}>{techName}</h1>}

            {isClicked &&

                <input className='tech-edit-input'
                       onChange={handleInputChange}
                       onKeyDown={handleKeypress}
                       value={techName}
                       onFocus={(e) => {
                           formOnClick(e);
                           setOldName(e.target.value)
                       }}
                       autoFocus
                       onMouseLeave={() => setIsClicked(!isClicked)}
                />}</>
    )
}