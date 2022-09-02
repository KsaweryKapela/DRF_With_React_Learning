import React, {useState} from 'react'
import axios from "axios";
import RenderToDos from "../RenderToDos";


export default function TaskAdd(PL_ID) {
    const [values, setValues] = useState({
        PL: ''
    });

    const handleInputChange = (event) => setValues({values, PL: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "post",
             url: "http://127.0.0.1:8000/edit-todos/",
             data: {language: PL_ID.PL_ID,
                    name: values.PL,
                    description: 'Description of ' + values.PL,
                    done: false},
             headers: { "Content-Type": "json" }})

      setValues({values, PL: ''})
      window. location. reload();
    }}

    return (
        <div>
            <hr/>
            <p>Add new task</p>
            <input value={values.PL}
                   onChange={handleInputChange}
                   onKeyDown={handleKeypress}
            />
        </div>
    )
}