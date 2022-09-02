import React, {useState} from "react";
import axios from "axios";

export default function TaskDelete(data) {

    function deleteTask() {

        axios({
               method: "delete",
               url: "http://127.0.0.1:8000/edit-todos/",
               data: {name: data.name},
               headers: { "Content-Type": "json" }
        })
        window. location. reload();}

    return (
        <button onClick={deleteTask}> X </button>
    )
}