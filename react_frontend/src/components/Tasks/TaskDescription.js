import React, {useState} from "react";
import axios from "axios";

export default function TaskDescription(data) {

    const [isClicked, setIsClicked] = useState(false);

    const [values, setValues] = useState({
      description: data.description
    })
    const handleInputChange = (event) => setValues({values, description: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

        axios({
               method: "patch",
               url: "http://127.0.0.1:8000/edit-todos/",
               data: {name: data.name,
                      description: values.description,
                      new_name: data.name
                      },
               headers: { "Content-Type": "json" }})

        setIsClicked(!isClicked)
    }}

    return (
        <>
            {!isClicked &&
            <p onClick={() => setIsClicked(!isClicked)}>{values.description}</p>}
            {isClicked && <div><p>
             <textarea value={values.description}
                         onChange={handleInputChange}
                         onKeyDown={handleKeypress}/> </p></div>}
        </>
    )
}