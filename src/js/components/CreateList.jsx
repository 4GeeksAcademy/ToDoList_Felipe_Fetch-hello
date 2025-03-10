import React from "react";
import ListItem from "./ListItem";

function CreateList(props) {

    if (!props.arrayList || props.arrayList.length === 0) {
        return <div className="container mt-3">There are no items in the list.</div>;
    }

    return (
        <>
            <div className="container mt-3">
                <ul className="list-group">
                    {props.arrayList.map((element, index) => {
                        return (
                            <ListItem 
                                key= {index}
                                id={element.id}
                                label={element.label}
                                is_done={element.is_done}
                                deleteTask={props.deleteList}
                                completedTask={props.completedTask}
                            />
                        )
                    }
                    )}
                </ul>
            </div>    
        </>
    )
}
export default CreateList;