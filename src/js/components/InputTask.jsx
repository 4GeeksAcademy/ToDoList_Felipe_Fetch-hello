import React from "react"
import { useState } from "react"

function InputTask(props) {
    const [currentLabel, setCurrentLabel] = useState({
        label: "",
    })
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertTrim, setShowAlertTrim] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target;
        setCurrentLabel((prev) => ({
          ...prev,
          [name]: value,  
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (currentLabel.label.trim() === "") {
            setShowAlertTrim(true)
            setTimeout(() => {setShowAlertTrim(false)},3000)
            return
        }
        props.addOneTask(currentLabel)
        setShowAlert(true);
        setCurrentLabel({
            label: "",
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
                    <label htmlFor="title" className="form-label fs-2">
                        Enter a new task:
                    </label>
                    <input 
                        type="text" 
                        placeholder="What needs to be done?"
                        className="form-control" 
                        id="title"
                        value={currentLabel.label}
                        name="label"
                        onChange={handleChange}
                        onKeyDown={handleKey}
                    />
                </div>
                <button type="button" className="btn btn-success my-3" onClick={handleSubmit}>Send</button>
            </form>

            {/*Alert */}
            {showAlertTrim && 
                <div className="container alert alert-danger" role="alert">
                    Please enter a task!
              </div>
            }
            {showAlert && 
                <div className="container alert alert-success" role="alert">
                    Task successfully created!
              </div>
            }
        </>

    )
}

export default InputTask;