import React from "react"
import { useState } from "react"

function UserDropdown(props) {
    const [dataUser, setDataUser] = useState([])

    return (
        <>
        <div className="container mt-4">
            <h2>Users List: </h2>
            <select onChange={(e) => {
                props.selectedUser(e.target.value)
                setDataUser(props.infoUser)
                console.log(dataUser)}}>
                <option>Select a user from the list</option>
                    {props.users.map((user) => {
                        return(
                            <option key={user.id} value={user.name}>{user.name}</option>
                        )  
                    })}
            </select>
        </div>
        </>
    )
}

export default UserDropdown;