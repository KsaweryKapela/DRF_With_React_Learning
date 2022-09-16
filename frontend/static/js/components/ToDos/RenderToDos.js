import React, {useState, useEffect} from 'react'
import axios from "axios";
import TaskAdd from "./Tasks/TaskAdd";
import TaskDescription from "./Tasks/TaskDescription";
import TaskName from "./Tasks/TaskName";
import TechAdd from "./Tech/TechAdd";
import TechEdit from "./Tech/TechEdit";
import toDosForm from "./toDosForm";


export default function RenderToDos() {

    const {UpdateTech, usersTech} = toDosForm()

     useEffect(() => {
         UpdateTech()
    }, []);


    return (
        <>

        <div className='to-do-table'>
            <TechAdd/>
                {
                    usersTech.map(Tech => <div className='tech-item' key={Tech.id}> <TechEdit tech_name={Tech.name}/>
                            {Tech['tasks'].map(task => <div><hr/>

                                <TaskName {...task}/>
                                <TaskDescription {...task}/>
                                </div>
                            )}
                    < TaskAdd Tech_ID = {Tech.id}/> </div>
                    )
                }
        </div>
                   <a href="/logout"> <button>Log out</button> </a>
        </>
    )}
