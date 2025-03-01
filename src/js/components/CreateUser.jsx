import React from "react";
import { useState } from "react";

function CreateUser (props) {

    const [currentName, setCurrentName] = useState({
        name: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertTrim, setShowAlertTrim] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setCurrentName((prev) => ({
          ...prev,
          [name]: value,  
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (currentName.name.trim() === "") {
            setShowAlertTrim(true)
            setTimeout(() => {setShowAlertTrim(false)},3000)
            return;
        }
        props.newUser(currentName.name)
        setShowAlert(true);
        setCurrentName({
            name: "",
        })
        setTimeout(() => {setShowAlert(false)},3000)
    }

    function handleKey(e) { 
         
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleSubmit(e)
        }
        
    }
    return (
        <>
            <form className="container-md my-5">
                <div className="mb-3">
                    <label htmlFor="newUser" className="form-label fs-1">
                        Create a new user:
                    </label>
                    <input 
                        type="text" 
                        placeholder="Insert the user name"
                        className="form-control" 
                        id="newUser"
                        name="name"
                        value={currentName.name}
                        onChange={handleChange}
                        onKeyDown={handleKey}
                    />
                </div>
                <button type="button" className="btn btn-success my-3" onClick={handleSubmit}>Create</button>
            </form>

            {/*Alert */}
            {showAlertTrim && 
                <div className="container alert alert-danger" role="alert">
                    Please enter a valid user!
              </div>
            }
            {showAlert && 
                <div className="container alert alert-success" role="alert">
                    User successfully created!
              </div>
            }
        </>
    )
}
export default CreateUser;