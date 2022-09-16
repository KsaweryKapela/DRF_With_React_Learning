import {useEffect, useState} from "react";
import axios from "axios";
import getCookie from "../csrfToken/getCookie";

const toDosForm = () => {
    const [usersTech, setUsersTech] = useState([])

    const UpdateTech = () => {
        useEffect(() => {
            async function fetchData() {
                const res = await axios('http://127.0.0.1:8000/return-users-tech/')
                await setUsersTech(res.data[0])
            }

            fetchData()
        }, [])
    }

    function formOnClick(event) {
    event.target.select()
    }

    const [TechInput, setTechInput] = useState({
        name: ''
    });


    const csrftoken = getCookie('csrftoken');

    return{usersTech, UpdateTech, formOnClick, TechInput, setTechInput, csrftoken}
}

export default toDosForm