import React from 'react';

interface IProps {
    people: {
        name: string,
        age: number,
        url: string,
        notes?: string,
    }[]
}


const List_of_people: React.FC<IProps> = ({ people }) => {

        const renderList = (): JSX.Element[] => {
            return people.map((person) => {
                return (
                <li>
                    <p> {person.name} </p>
                    <img src={person.url} alt='xxx' />
                    <p> {person.age} </p>
                    <p> {person.notes} </p>
                </li>
                )})
        }

    return (

        <ul>
            {renderList()}
        </ul>
    )
}

export default List_of_people