import React from "react";
import CreateList from "./CreateList";
import InputTask from "./InputTask";
import CreateUser from "./CreateUser";
import UserDropdown from "./UserDropdown";
import { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [task, setTask] = useState([])
	const [allUsers, setAllUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)
	const [dataUser, setDataUser] = useState(null)

	useEffect(( )=> {
		fetchUsers()
	},[])
	
	//Metodo GET para traer todos los usuarios de la base de datos
	const fetchUsers = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users");
			if (!response.ok) {
				throw new Error ("Error");
			}
			const data = await response.json();
			console.log(data.users)
			setAllUsers(data.users);
		}catch (error) {
			console.log("Hay error" + error)
		}
	}
	//Carga las tareas del usuario seleccionado
	const fetchTodos = async (userName) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`);
			if (!response.ok) {
				throw new Error ("Error");
			}
			const data = await response.json();
			console.log(data.todos)
			setTask(data.todos);
		}catch (error) {
			console.error("Error al cargar tarea" + error)
		}
	}
	//Función para capturar el usuario seleccionado
	const userSelected = async (userName) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`);
			if (!response.ok) {
				throw new Error ("Error");
			}
			const data = await response.json();
			console.log(data)
			setSelectedUser(data);
			fetchTodos(userName);
		}catch (error) {
			console.error("Error al seleccionar usuario" + error)
		}
	}

	//Función para crear un nuevo usuario
	const createNewUser = async (newUser) => {
		if (!newUser) {
			console.error("El nombre del usuario no puede estar vacío.");
			return;
		}

		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${newUser}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: newUser,
				}),
			});
			if (!response.ok) {
				throw new Error (`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log(`Nuevo usuario creado: ${data}`)

			setAllUsers((prev) => [...prev, data]);
			
		} catch (error) {
			console.error(`Hubo un problema al crear el usuario: ${error}`)
		}
	}

	//Función para agregar una tarea al usuario seleccionado
	const addTask = async (label) => {
		if (!userSelected) {
			console.error("No hay un usuario seleccionado")
		}
		const newTask = {
			label: label.label ,
			is_done: false,
		};
		try {
			const response = await fetch(
				`https://playground.4geeks.com/todo/todos/${selectedUser.name}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},

					body: JSON.stringify(newTask),
				})

				if(!response.ok) {
					throw new Error("Error al crear la tarea")
				}
				const data = await response.json();
				console.log(data)
				setTask((prev) => [...prev, data])
				await fetchTodos(selectedUser.name)
		} catch (error) {
			console.error("Error al añadir tarea al usuario")
		}
	}
	
	const deleteTask = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${selectedUser.name}`, {
			  method: 'DELETE',
			});
			if (!response.ok) {
			  throw new Error(`Error HTTP! Estado: ${response.status}`);
			}
			
			setTask(task.filter(task => task.id !== id))
			await fetchTodos(selectedUser.name)
		  } catch (error) {
			console.error('Hubo un problema al eliminar el usuario:', error.message);
		  }
    }

	return (
		<>
		<CreateUser newUser={createNewUser} />
		<UserDropdown users={allUsers} selectedUser={userSelected} infoUser={selectedUser} />
		<InputTask addOneTask={addTask} />
		<CreateList arrayList={task} deleteList={deleteTask}/>
		</>
	);
};

export default Home;