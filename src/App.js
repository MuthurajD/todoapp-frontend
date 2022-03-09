import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import {getLoginProps,getSignupProps} from './utils'
import Header from './components/Header';
import TaskList from './components/task/TaskList';
import NewTask from './components/task/NewTask';
import {Navigate} from 'react-router-dom'

function App() {
  const [isAuth,setAuth] = useState(false)
  const [isTaskCreated,setIsTaskCreated] = useState(false)

  return (
      <Routes> 
        <Route path='/' element={<Header isAuth={isAuth} setAuth={setAuth}/>} >
          <Route path="login" element={<AuthForm {...getLoginProps()} title={"Login"} isAuth={isAuth} setAuth={setAuth}/>}/>
          <Route path="signup" element={<AuthForm {...getSignupProps()} title={"Signup"} isAuth={isAuth} setAuth={setAuth}/>}/>
          <Route path='tasks' element={<TaskList isTaskCreated={isTaskCreated}/>}>
            <Route path='new' element={<NewTask isTaskCreated={isTaskCreated} setIsTaskCreated={setIsTaskCreated}/>}/>
          </Route>
          <Route path="" element={<Navigate to="/signup" />}/>
        </Route>
      </Routes>
  );
}

export default App;
