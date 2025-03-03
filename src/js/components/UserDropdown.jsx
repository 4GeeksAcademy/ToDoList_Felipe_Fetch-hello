import React from "react"
import { useEffect } from "react"

function UserDropdown(props) {

    useEffect(() =>{
        console.log("El usuario ha sido actualizado:", props.infoUser)
    },[props.infoUser])

    return (
        <>
        <div className="container mt-4">
            <h2>Users List: </h2>
            <select onChange={(e) => {props.selectedUser(e.target.value)}}>
                <option>Select a user from the list</option>
                    {props.users.map((user) => {
                        return(
                            <option key={user.id} value={user.name}>{user.name}</option>
                        )  
                    })}
            </select>
        </div>
        {props.infoUser &&
            <div className="container">
                <div className="card d-flex justify-content-start mt-4" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Selected User:</h5>
                        <p className="card-text">Name: {props.infoUser.name}</p>
                        <p className="card-text">Tasks: {props.infoUser.todos.length}</p>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default UserDropdown;