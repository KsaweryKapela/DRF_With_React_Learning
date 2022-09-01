import React, {useState} from 'react'
import axios from "axios";
import ReturnPL from "./ReturnPL";


export default function AddForms(PL_ID) {
    const [values, setValues] = useState({
        PL: ''
    });

    const handleInputChange = (event) => setValues({values, PL: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "post",
             url: "http://127.0.0.1:8000/get-todos/",
             data: {language: PL_ID.PL_ID,
                    name: values.PL,
                    description: 'None',
                    done: false},
             headers: { "Content-Type": "json" }})

      setValues({values, PL: ''})
      window. location. reload();
    }}

    return (
        <div>
            <input value={values.PL}
                   onChange={handleInputChange}
                   onKeyDown={handleKeypress}
            />
        </div>
    )
}