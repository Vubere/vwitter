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
const ReplyPage = lazy(() => import('./pages/ReplyPage'))
const Profile = lazy(() => import('./pages/Profile'))

const Users = lazy(() => import('./pages/users'))
const Todo = lazy(() => import('./pages/Todo'))
const EditProfile = lazy(() => import('./pages/EditProfile'))
const Following = lazy(() => import('./pages/following'))
const Followers = lazy(() => import('./pages/followers'))

function App() {

  return (
    <div className="App max-w-[520px]">
      <Routes>
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.login} element={<Login />} />
        <Route path='/' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }>
          <Route path={routes.home} element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path={routes.search} element={
            <ProtectedRoutes>
              <Search />
            </ProtectedRoutes>
          } />
          <Route path={routes.notifications} element={
            <ProtectedRoutes>
              <Notification />
            </ProtectedRoutes>
          } />
          <Route path={routes.messages} element={
            <ProtectedRoutes>
              <Message />
            </ProtectedRoutes>
          } />
          <Route path={routes.compose} element={
            <ProtectedRoutes>
              <ComposeTweet />
            </ProtectedRoutes>
          } />
          <Route path={routes.postpage} >
            <Route path=':postId' element={<PostPage />} />
          </Route>
        </Route>
        <Route path={routes.users} element={
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        } />
        <Route path={routes.todo} element={
          <ProtectedRoutes>
            <Todo />
          </ProtectedRoutes>
        } />
        <Route path={routes.followers + '/:user'} element={
          <ProtectedRoutes>
            <Followers />
          </ProtectedRoutes>
        } />
        <Route path={routes.following + '/:user'} element={
          <ProtectedRoutes>
            <Following />
          </ProtectedRoutes>
        } />
        <Route path={routes.chat}>
          <Route path=':chatId' element={
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          } />
        </Route>
        <Route path={'reply'}>
          <Route path=':reply' element={
            <ProtectedRoutes>
              <ReplyPage />
            </ProtectedRoutes>
          } />
        </Route>
        <Route path={`${routes.profile}/:username`} element={<Profile />} />
        <Route path={`${routes.edit_profile}/:username`} element={<EditProfile />} />
        <Route path='*' element={<p>page not found...</p>}/>
      </Routes>
    </div>
  )
}

export default App
