import React, {useState, useEffect} from 'react'
import axios from "axios";
import TaskAdd from "./Tasks/TaskAdd";
import TaskDescription from "./Tasks/TaskDescription";
import TaskName from "./Tasks/TaskName";
import TaskDelete from "./Tasks/TaskDelete";
import PLAdd from "./PL/PLAdd";
import PLEdit from "./PL/PLEdit";

import './style/RenderToDos.css'


export default function RenderToDos() {
    const [usersPL, setUsersPL] = useState([])

    useEffect(() => {
            async function fetchData() {
            const res = await axios('http://127.0.0.1:8000/return-users-PL/')
            await setUsersPL(res.data[0])}
            fetchData()}, [])

    console.log(usersPL);
    return (
        <>
        <div className='to-do-table'>
            <PLAdd/>
                {
                    usersPL.map(PL => <div className='tech-item' key={PL.id}> <PLEdit tech_name={PL.name}/>

                            {PL['tasks'].map(task => <div><hr/>

                                <TaskName {...task}/>
                                <TaskDescription {...task}/>
                                <TaskDelete {...task}/>
                                </div>
                            )}
                    < TaskAdd PL_ID = {PL.id}/> </div>
                    )

                }
        </div></>
    )}
