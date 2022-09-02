import React, {useState} from "react";
import axios from "axios";

export default function TaskName(data) {
    const [isClicked, setIsClicked] = useState(false);

    const [values, setValues] = useState({
      name: data.name
    })
    const handleInputChange = (event) => setValues({values, name: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

        axios({
               method: "patch",
               url: "http://127.0.0.1:8000/edit-todos/",
               data: {name: data.name,
                      description: data.description,
                      new_name: values.name
                      },
               headers: { "Content-Type": "json" }})

        setIsClicked(!isClicked)
    }}

    return (
        <>
            {!isClicked &&
            <h3 onClick={() => setIsClicked(!isClicked)}>{values.name}</h3>}
            {isClicked && <div><p>
             <input value={values.name}
                         onChange={handleInputChange}
                         onKeyDown={handleKeypress}/> </p></div>}
        </>
    )
}