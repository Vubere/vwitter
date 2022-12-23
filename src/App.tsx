import { useState, lazy } from 'react'
import {Routes, Route} from 'react-router-dom'

import * as routes from './constants/route'

const Signup = lazy(()=>import('./pages/Signup'))
const Login = lazy(()=>import('./pages/Login'))

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={routes.signup} element={<Signup/>}/>
        <Route index element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
