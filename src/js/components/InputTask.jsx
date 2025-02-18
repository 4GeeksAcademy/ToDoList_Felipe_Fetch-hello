import React from "react"
import { useState } from "react"

function InputTask(props) {
    const [formData, setFormData] = useState({
        title: "",
        id: ""
    })

    const [showAlert, setShowAlert] = useState(false)
    const [showAlertTrim, setShowAlertTrim] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,  
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.title.trim() === "") {
            setShowAlertTrim(true)
            setTimeout(() => {setShowAlertTrim(false)},3000)
            return
        }
        props.addOneList(formData)
        setShowAlert(true);
        setFormData({
            title: "",
            id: "",
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
                    <label htmlFor="title" className="form-label">
                        Enter a new task:
                    </label>
                    <input 
                        type="text" 
                        placeholder="What needs to be done?"
                        className="form-control" 
                        id="title"
                        value={formData.title}
                        name="title"
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