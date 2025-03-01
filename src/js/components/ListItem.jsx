import React from "react"

function ListItem(props) {
    function handleClick(){
        props.deleteTask(props.id)
    }
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-item-center" 
            id={props.id} >
                {props.label}
                <button onClick={handleClick} type="button" 
                className="btn btn-outline-danger">
                    Delete
                </button>
            </li>
        </>
    )
}

export default ListItem;