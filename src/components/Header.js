import React, { useEffect, useState } from "react";
import { Link,Outlet, useNavigate} from "react-router-dom";
import {decode} from 'jsonwebtoken'


export default function Header({isAuth,setAuth}){

    const [token,setToken] = useState(null)
    const [name,setName] = useState(null);
    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.removeItem('token')

        setAuth(isAuth=>!isAuth)
        setName(null)
        setToken(null)
        navigate("/signup")
    }
    
    useEffect(()=>{
        const newToken = localStorage.getItem('token')
        if(!newToken) return
        setName(decode(newToken)['name'])
        setToken(newToken)
    },[isAuth])

    return(
        <>
        <div className="center-horizontal">
            <div style={{width:'80%'}}  >
            <h1 className="inline">TaskApp</h1>
            {
                token ? 

                <div className="center-vertical f-right fullHeight">
                    <span className="f-right"><i>{name}</i></span>
                    <button className="f-right" onClick={logout}>Logout</button>
                </div> :

                <div className="center-vertical f-right fullHeight">
                    <Link  to={'/signup'}><button>Signup</button></Link>
                    <Link  to={'/login'}><button>Login</button></Link>
                </div>
            }
            </div>
        </div>
        <Outlet/>
        </>
    )
}