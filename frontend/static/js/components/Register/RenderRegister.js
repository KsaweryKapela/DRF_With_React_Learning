import React, {useState, useEffect} from 'react'
import SingUpForms from "./SingUpForms";


export default function RenderRegister() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true)
    }

    return (
        <div>
        {!isSubmitted ? <SingUpForms submitForm={submitForm} /> : <FormSuccess/>}
            </div>
    )
}