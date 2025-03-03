import React from "react"

function ListItem(props) {
    function handleClickDelete(){
        props.deleteTask(props.id)
    }
    function handleClickComplete() {
        props.completedTask(props.id)
    }
    return (
        <>
            <li 
            className="list-group-item d-flex justify-content-between align-item-center" 
            id={props.id} >
                <div>
                <h5 className={props.is_done ? "text-decoration-line-through" : ""}>
                {props.label}
                </h5>
                <p> ID: {props.id}</p>
                </div>
                <div>
                    <button 
                    onClick={handleClickComplete} 
                    type="button" 
                    className={`btn ${ props.is_done ? "btn-secondary" : "btn-success"} me-2`}>
                        {props.is_done ? "Incompleted" : "Completed" }
                    </button>
                    <button 
                    onClick={handleClickDelete} 
                    type="button" 
                    className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </li>
        </>
    )
}

export default ListItem;