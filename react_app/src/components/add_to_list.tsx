import React, { useState } from "react";

const AddToList = () => {

    const quickFetch = async (url: string) => {
        await fetch(url + '?' + new URLSearchParams(
            {
                'name': input.name,
                'age': input.age,
                'notes': input.notes,
                'img_src': input.img_src
            }));
}

    const [input, setInput] = useState({
        name: '',
        age: '',
        notes: '',
        img_src: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (): void => {
        if(
            !input.name ||
            !input.age ||
            !input.notes ||
            !input.img_src)
        {return
        }else{
            quickFetch('http://127.0.0.1:8000/get-data').then(r => console.log(r))
        }}

    return (
        <div>
            <input
                type='text'
                placeholder = 'name'
                className = 'AddToList-input'
                value={input.name}
                onChange={handleChange}
                name='name'>
            </input>

            <input
                type='text'
                placeholder = 'age'
                className = 'AddToList-input'
                value={input.age}
                onChange={handleChange}
                name = 'age'>
            </input>

            <input
                type='text'
                placeholder = 'notes'
                className = 'AddToList-input'
                value={input.notes}
                onChange={handleChange}
                name = 'notes'>

            </input>

            <input
                type='text'
                placeholder = 'img_src'
                className = 'AddToList-input'
                value={input.img_src}
                onChange={handleChange}
                name = 'img_src'>
            </input>
            <button
            onClick={handleClick}>
                Add to list
            </button>
        </div>
    )
}

export default AddToList