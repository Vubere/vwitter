import { useState, lazy } from 'react'
import {Routes, Route} from 'react-router-dom'

import * as routes from './constants/route'

const Signup = lazy(()=>import('./pages/Signup'))
const Login = lazy(()=>import('./pages/Login'))
const Dashboard = lazy(()=>import('./pages/Dashboard'))

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={routes.signup} element={<Signup/>}/>
        <Route path={routes.login} element={<Login/>}/>
        <Route index element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
