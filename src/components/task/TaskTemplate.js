import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import InputComponent from "../InputComponent"
import { Link } from "react-router-dom"

export function TaskTemplate(props){
    const {objectReference,handleChange,handleDelete,toggleStatus} = props
    const {_id,description,status,error} = objectReference
    const [editable,setEditable] = useState(false) 

    const toggleEditable = ()=>{
        setEditable(!editable)
    }
    return(
        <div key={_id} className="task-wrapper"> 
                {
                    editable ? 
                    <div>
                        <InputComponent objectReference={objectReference} name="description"
                        value={description} type="text" handleChange={handleChange} 
                        error={error} showLabel={false}/>
                        <button onClick={toggleEditable}>save</button>
                    </div>:

                    <h2 onDoubleClick={toggleEditable}>{description}</h2>
 
                }
                <p><i>{status}</i></p>
                {
                    status==='COMPLETED' ?
                    <FontAwesomeIcon icon={faToggleOn} onClick={(e)=>{toggleStatus(e,objectReference)}}></FontAwesomeIcon> :
                    <FontAwesomeIcon icon={faToggleOff} onClick={(e)=>{toggleStatus(e,objectReference)}}></FontAwesomeIcon>
                }

                <p onClick={(e)=>handleDelete(e,objectReference)} style={{position:"absolute",display:"inline",margin:"5px",top:"0px",color:"red",right:"0px"}}>x</p>
        </div>
    )
}