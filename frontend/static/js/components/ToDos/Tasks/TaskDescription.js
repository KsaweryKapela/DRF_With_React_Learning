import React, {useState} from "react";
import axios from "axios";
import getCookie from "../../csrfToken/getCookie";
import toDosForm from "../toDosForm";

export default function TaskDescription(data) {

    const {formOnClick} = toDosForm()

    const [isClicked, setIsClicked] = useState(false);

    const csrftoken = getCookie('csrftoken');

    const [description, setDescription] = useState(data.description)

    const handleInputChange = (event) => setDescription(event.target.value)

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {
        axios({
               method: "patch",
               url: "http://127.0.0.1:8000/edit-todos/",
               data: {old_name: data.name,
                      description: description,
                      new_name: data.name
                      },
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})

        setIsClicked(!isClicked)
    }}

    return (
        <>
            {!isClicked &&
            <p onClick={() => setIsClicked(!isClicked)}>{description}</p>}
            {isClicked && <div><p>
             <textarea value={description}
                         onChange={handleInputChange}
                         onKeyDown={handleKeypress}
                         onFocus={(e) => formOnClick(e)}
                         autoFocus
                         onMouseLeave={() => setIsClicked(!isClicked)}
             /></p></div>
            }
        </>
    )
}