import axios from "axios";
import decode from "jsonwebtoken/decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emptyChecker } from "../../utils";
import InputComponent from "../InputComponent";

export default function NewTask({setIsTaskCreated}){
    const [description,setDescription] = useState("")
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e,objectReference)=>{
        const check = emptyChecker(e.currentTarget.value)

        if('error' in check){
            return setError(check['error'])
        }

        setDescription(e.currentTarget.value)
        setError(null)
    }

    const createNewTask = async(e)=>{
        e.preventDefault()
        const token = localStorage.getItem('token')
        const {_id} = decode(token)
        try{
            const task = {
                description,
                status : "INPROGRESS",
                user_id:_id
            }
            await axios.post('http://localhost:8080/tasks/new',task,{
                headers:{
                    token
                }
            })
            setIsTaskCreated(isTaskCreated=>!isTaskCreated)
            navigate('/tasks')

        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <form onSubmit={createNewTask}>
            <InputComponent  name={"description"}
            value={description} type={'text'} handleChange={handleChange} 
            error={error}/>
            <button type="submit">Create task</button>
        </form>
    )
}