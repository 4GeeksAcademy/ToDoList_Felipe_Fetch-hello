import React from "react";
import CreateList from "./CreateList";
import InputTask from "./InputTask";
import { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [newLIs, setNewLIs] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		return savedTasks ? JSON.parse(savedTasks) : [];
	})
	const [idCounter, setIdCounter] = useState(() => {
		const savedIdCounter = localStorage.getItem("id");
		return savedIdCounter ? parseInt(savedIdCounter) : 0;
	})

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(newLIs))}, [newLIs]);
	
	useEffect(() => {
		localStorage.setItem("idCounter", idCounter.toString())},[idCounter]);

	function addAList (newLI) {
		setNewLIs([...newLIs, {...newLI, id: idCounter}])
		setIdCounter(idCounter + 1)
	}

	function deleteTask(id) {
        setNewLIs(newLIs.filter(task => task.id !== id))
    }

	return (
		<>
		<InputTask addOneList={addAList} />
		<CreateList arrayList={newLIs} deleteList={deleteTask}/>
		</>
	);
};

export default Home;