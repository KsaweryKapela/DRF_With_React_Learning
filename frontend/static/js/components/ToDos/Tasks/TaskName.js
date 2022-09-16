import React, {useState} from "react";
import axios from "axios";
import getCookie from "../../csrfToken/getCookie";
import toDosForm from "../toDosForm";

export default function TaskName(data) {
    const {formOnClick} = toDosForm()
    const csrftoken = getCookie('csrftoken');
    const [isClicked, setIsClicked] = useState(false);

    const [taskName, setTaskName] = useState(data.name)
    const [oldName, setOldName] = useState('');

    const handleInputChange = (event) => setTaskName(event.target.value)


    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

    if(event.target.value === '') {
    }else if (!/[a-zA-Z]/g.test(event.target.value)) {
        return
    }
        axios({
               method: "patch",
               url: "http://127.0.0.1:8000/edit-todos/",
               data: {old_name: oldName,
                      description: data.description,
                      new_name: taskName
                      },
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})

    if (taskName === '') {window.location.reload()}
    else {setIsClicked(!isClicked)}
    }}

    return (
        <>
            {!isClicked &&
            <h3 onClick={() => setIsClicked(!isClicked)}>{taskName}</h3>}
            {isClicked && <div><p>
             <input value={taskName}
                         onChange={handleInputChange}
                         onKeyDown={handleKeypress}
                         onFocus={(e) =>
                         {formOnClick(e); setOldName(taskName)}}
                         autoFocus
                         onMouseLeave={() => setIsClicked(!isClicked)}
            /></p></div>}
        </>
    )
}