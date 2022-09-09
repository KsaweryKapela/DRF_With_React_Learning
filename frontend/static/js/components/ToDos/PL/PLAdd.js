import React, {useState} from 'react'
import axios from "axios";
import formOnClick from '../formOnClick'


export default function PLAdd() {
    const [values, setValues] = useState({
        PL: 'New tech'
    });

    const handleInputChange = (event) => setValues({values, PL: event.target.value})

    const handleKeypress = (event) => {
    if (event.keyCode === 13) {

      axios({
             method: "post",
             url: "http://127.0.0.1:8000/edit-PL/",
             data: {name: values.PL,
                    tasks: []},
             headers: { "Content-Type": "json" }})

      setValues({values, PL: ''})
      window. location. reload();
    }}

    return (
        <>
            <input className='add-PL-label' value={values.PL}
                   onChange={handleInputChange}
                   onKeyDown={handleKeypress}
                   onClick={(e) => formOnClick(e)}
            />
       </>
    )
}