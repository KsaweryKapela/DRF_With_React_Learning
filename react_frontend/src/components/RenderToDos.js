import React, {useState, useEffect} from 'react'
import axios from "axios";
import TaskAdd from "./Tasks/TaskAdd";
import TaskDescription from "./Tasks/TaskDescription";
import TaskName from "./Tasks/TaskName";
import TaskDelete from "./Tasks/TaskDelete";


export default function RenderToDos() {
    const [usersPL, setUsersPL] = useState([])
    const [usersTasks, setUsersTasks] = useState({})

    useEffect(() => {
            async function fetchData() {
            const res = await axios('http://127.0.0.1:8000/return-users-PL/')
            await setUsersPL(res.data[0])
            await setUsersTasks(res.data[1])}
            fetchData()}, [])


    return (
        <div>
            <ul>
                {
                    usersPL.map(PL => <li key={PL.id}> {PL.name}

                            {PL['tasks'].map(task => <div><hr/>

                                <TaskName {...usersTasks[PL['tasks'].indexOf(task)]}/>
                                <TaskDescription {...usersTasks[PL['tasks'].indexOf(task)]}/>
                                <TaskDelete {...usersTasks[PL['tasks'].indexOf(task)]}/>
                                </div>
                            )}
                    < TaskAdd PL_ID = {PL.id}/> </li>
                    )
                }
            </ul>
        </div>
    )}
