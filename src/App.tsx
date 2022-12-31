import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import * as routes from './constants/route'
import ProtectedRoutes from './helpers/ProtectedRoutes'

const Signup = lazy(() => import('./pages/Signup'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const Home = lazy(() => import('./pages/Dashboard/home'))
const Search = lazy(() => import('./pages/Dashboard/search'))
const Notification = lazy(() => import('./pages/Dashboard/Notification'))
const Message = lazy(() => import('./pages/Dashboard/message'))
const Chat = lazy(() => import('./pages/Chat'))
const ComposeTweet = lazy(() => import('./pages/Dashboard/Compose'))
const PostPage = lazy(() => import('./pages/Dashboard/PostPage'))
const Profile = lazy(() => import('./pages/Profile'))

const Tweets = lazy(() => import('./pages/Profile/tweets'))
const Likes = lazy(() => import('./pages/Profile/likes'))
const Replies = lazy(() => import('./pages/Profile/replies'))
const Users = lazy(() => import('./pages/users'))
const Todo = lazy(() => import('./pages/Todo'))

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.login} element={<Login />} />
        <Route path='/' element={<Dashboard />}>
          <ProtectedRoutes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.search} element={<Search />} />
            <Route path={routes.notifications} element={<Notification />} />
            <Route path={routes.messages} element={<Message />} />
            <Route path={routes.compose} element={<ComposeTweet />} />
          </ProtectedRoutes>
           <Route path={routes.postpage} element={<PostPage />} />
        </Route>
        <ProtectedRoutes>
          <Route path={routes.users} element={<Users />} />
          <Route path={routes.todo} element={<Todo />} />
          <Route path={routes.chat}>
            <Route path=':chatId' element={<Chat />} />
          </Route>
        </ProtectedRoutes>
        <Route path={routes.profile} element={<Profile />}>
          <Route index element={<Tweets />} />
          <Route path='/profile/replies' element={<Replies />} />
          <Route path='/profile/likes' element={<Likes />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
