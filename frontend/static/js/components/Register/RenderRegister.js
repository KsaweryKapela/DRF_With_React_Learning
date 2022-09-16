import React, {useEffect, useState} from 'react'
import SingUpForms from "./SingUpForms";
import axios from "axios";


export default function RenderRegister() {


    const [alreadyLogged, setAlreadyLogged] = useState();

    useEffect(() => {
        async function fetchData() {
    return axios('/user-state')}
    fetchData().then(r => setAlreadyLogged(r.data['is_logged']))}, [])

    if (alreadyLogged) {
        return (<div>You are already logged in.
            <p>
                <a href="/register">
                    <button>Log out</button>
                </a>
            </p>
        </div>)}

    return (
        <div>
        <SingUpForms/>
        </div>
    )
}