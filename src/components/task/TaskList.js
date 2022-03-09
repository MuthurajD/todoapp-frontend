import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { TaskTemplate } from "./TaskTemplate";
import { emptyChecker } from '../../utils'
import {Link,Outlet} from 'react-router-dom'

export default function TaskList({isTaskCreated,setTaskCreated}){
    const [tasks,setTasks] = useState([])
    const [token,setToken] = useState(()=>localStorage.getItem('token'))
    const navigate = useNavigate()

    console.log(isTaskCreated,"tasklist")

    useEffect(()=>{
        if (!token) navigate('/signup')

        axios.get('http://localhost:8080/tasks',{
            headers : {
                token
            }
        })
        .then((result)=>{
            if ('error' in result.data) throw new Error(result.data['error'])
            setTasks(result.data['tasks'].map(each=>{
                return ({...each,error:null})
            }))
        })
        .catch((e)=>{

            navigate('/signup')
        })

    },[isTaskCreated])

    const toggleStatus = async(e,objectReference)=>{
        console.log(objectReference)
        const resultObject = {...objectReference,
            status:(objectReference.status==='INPROGRESS' ? "COMPLETED" : "INPROGRESS")}
        
        delete resultObject['error']
        console.log(resultObject)
        
        try{
            axios.put(`http://localhost:8080/tasks/${resultObject['_id']}/update`,resultObject,{
                headers:{
                    token
                }
            })
            setTasks(tasks.map(each=>Object.is(each,objectReference) ? resultObject : each ))
        }
        catch(e){
            console.log(e)
        }
    }

    const updateDescription = async(e,objectReference)=>{
        const resultObject = {...objectReference,description:e.currentTarget.value}
        const check = emptyChecker(e.currentTarget.value)

        console.log(check)

        if ('error' in check){
            resultObject['error'] = check['error']
            return setTasks(tasks.map(each=>Object.is(each,objectReference) ? resultObject : each ))
        }

        delete resultObject['error']

        try{
            axios.put(`http://localhost:8080/tasks/${resultObject['_id']}/update`,resultObject,{
                headers:{
                    token
                }
            })
            setTasks(tasks.map(each=>Object.is(each,objectReference) ? resultObject : each ))
        }
        catch(e){
            console.log(e)
        }

    }

    const handleDelete = (e,objectReference)=>{
        axios.delete(`http://localhost:8080/tasks/${objectReference['_id']}/delete`,{
            headers:{
                token
            }
        })
        setTasks(tasks.filter(each=>!Object.is(each,objectReference)))
    }
    
    return (
        <div style={{marginTop:"10px"}}>
            <div style={{width:"80%",margin:"auto"}}>
                <div>
                    <Link style={{right:"0px"}} to={"/tasks/new"} >
                        <button>+ create new task</button>
                    </Link>
                </div>
                <div style={{marginTop:"5px",marginBottom:"5px"}}>
                {
                    tasks.map(each=><TaskTemplate objectReference={each} 
                        handleChange={updateDescription} handleDelete={handleDelete} 
                        toggleStatus={toggleStatus} />)
                }
                </div>
                <Outlet/>
            </div>
        </div>
    )
}