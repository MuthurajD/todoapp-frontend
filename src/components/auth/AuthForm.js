import React,{ useEffect, useMemo, useState } from "react";
import InputComponent from "../InputComponent";
import axios from "axios";
import propTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

export default function AuthForm({
    fieldsArr,fieldTypesArr,condictionChecksArr,submitURL,title,isAuth,setAuth
}){

    const [formState,setFormState] = useState([]);
    console.log(fieldsArr)
    const [error,setError] = useState(false);
    const navigate =  useNavigate()

    useEffect(()=>{
        const newFormState = []
        for(let i=0;i<fieldsArr.length;i++){
            newFormState.push({
                value : "",
                error : null,
                name : fieldsArr[i],
                type : fieldTypesArr[i],
                condition : condictionChecksArr[i]

            })
        }
        setFormState(newFormState)
        setError(false)
    },[title])

    const handleChange = (e,objectReference)=>{
        const newFormState = []

        formState.forEach((each,index)=>{
            if (Object.is(each,objectReference)){
                
                each.value = e.currentTarget.value
                const result = each.condition(each.value)
                if ('error' in result ) each.error = result['error']
                else each.error = null;
            }
            newFormState.push(each)
        })


        setFormState(newFormState)

    }   

    const handleSubmit = async(e)=>{
        e.preventDefault()
        for(let index=0;index<formState.length;index++){
            const result = formState[index].condition(formState[index].value)
            if ('error' in result ) return
        }
        const body = {}
        formState.forEach(each=>{
            body[each.name] = each.value
        })

        try{
            const httpResult =  await axios.post(submitURL,body);
            if ('error' in httpResult.data){
                setError(httpResult.data['error'])
            }
            else{
                localStorage.setItem('token',httpResult.data['token'])
                setAuth(!isAuth)
                navigate("/tasks")
                
            }
        }
        catch(e){
            setError(e.message)
        }

    }
    console.log(formState,title)
    return(
        <div className="fullHeight fullWidth">
            <div className="center-horizontal" style={{width:"100%"}}>
            <form onSubmit={handleSubmit}>
            {
                error ? <p>{error}</p> : <></>
            }
                <h2>{title}</h2>
            {
                formState.map((each,index) => 
                        <InputComponent objectReference={each} key={index}
                        name={each.name} value={each.value} type={each.type} 
                        error={each.error} handleChange={handleChange} showLabel/>)
            }
            <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}

AuthForm.propTypes = {
    fieldsArr : propTypes.array,
    fieldTypesArr : propTypes.array,
    condictionChecksArr : propTypes.arrayOf(propTypes.func),
    submitURL : propTypes.string,
    showLabel : propTypes.bool
}