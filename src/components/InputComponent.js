import React,{ Fragment } from "react";
import propTypes from 'prop-types'

export default function InputComponent({
    objectReference,name,value,type,handleChange,error,showLabel
}){
    return(
        <div className="input-wrapper">
            {
                showLabel ? 
                <label style={{fontVariant:"small-caps"}} htmlFor={name}>{name}</label> :
                <></>
            }
            <input name={name} value={value} 
                type={type} onChange={(e)=>{handleChange(e,objectReference)}} />
            {
                error ? <small>{error}</small> : <></>
            }
        </div>
    )
}
InputComponent.propTypes = {
    objectReference : propTypes.object,
    name : propTypes.string,
    value : propTypes.string,
    type : propTypes.string,
    handleChange : propTypes.func,
    error : propTypes.string,
    showLabel : propTypes.bool
}
