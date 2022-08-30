import React, {useState, useEffect} from 'react'
import axios from "axios";

export default function ReturnPL() {
    const [usersPL, setUsersPL] = useState([])

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/return-users-PL/')
            .then(res => {
                console.log(res.data)
                setUsersPL(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <ul>
                {
                    usersPL.map(PL => <li key={PL.id}> {PL.name} {PL.tasks.map(task => <p key={task}> {task} </p>)}</li>)
                }
            </ul>
        </div>
    )
}