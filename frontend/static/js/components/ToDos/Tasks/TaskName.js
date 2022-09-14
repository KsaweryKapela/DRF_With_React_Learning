import React, {useState} from "react";
import axios from "axios";
import formOnClick from "../formOnClick";
import getCookie from "../../csrfToken/getCookie";

export default function TaskName(data) {
    const csrftoken = getCookie('csrftoken');
    const [isClicked, setIsClicked] = useState(false);
    const [values, setValues] = useState({
      name: data.name,
      old_name: data.name
    })

    const handleInputChange = (event) => setValues({values, name: event.target.value,
    old_name: values.old_name})


    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

    if(event.target.value === '') {
    }else if (!/[a-zA-Z]/g.test(event.target.value)) {
        return
    }
        axios({
               method: "patch",
               url: "http://127.0.0.1:8000/edit-todos/",
               data: {name: values.old_name,
                      description: data.description,
                      new_name: values.name
                      },
             headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'X-CSRFToken': csrftoken
                       }})

            values.old_name = event.target.value

    if (values.name === '') {window.location.reload()}
    else {setIsClicked(!isClicked)}
    }}

    return (
        <>
            {!isClicked &&
            <h3 onClick={() => setIsClicked(!isClicked)}>{values.name}</h3>}
            {isClicked && <div><p>
             <input value={values.name}
                         onChange={handleInputChange}
                         onKeyDown={handleKeypress}
                         onFocus={(e) => formOnClick(e)}
                         autoFocus
                         onMouseLeave={() => setIsClicked(!isClicked)}
            /></p></div>}
        </>
    )
}