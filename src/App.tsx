import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import * as routes from './constants/route'


const Signup = lazy(() => import('./pages/Signup'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const Home = lazy(() => import('./pages/Dashboard/home'))
const Search = lazy(() => import('./pages/Dashboard/search'))
const Notification = lazy(() => import('./pages/Dashboard/Notification'))
const Message = lazy(() => import('./pages/Dashboard/message'))
const ComposeTweet = lazy(()=>import('./pages/Dashboard/Compose'))
const PostPage = lazy(()=>import('./pages/Dashboard/PostPage'))

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.login} element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.search} element={<Search />} />
          <Route path={routes.notifications} element={<Notification />} />
          <Route path={routes.messages} element={<Message />} />
          <Route path={routes.compose} element={<ComposeTweet />} />
          <Route path={routes.postpage} element={<PostPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
