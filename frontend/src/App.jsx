import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Link, Outlet } from "react-router-dom"
import HomePage from './pages/HomePage'
import RoomJoinPage from './pages/RoomJoinPage'
import CreateRoomPage from './pages/CreateRoomPage'
import Room from './components/Room'


const Root = () => {
  return (
    <>
      <nav>
        {/* <Link to="/"><HomePage /></Link>
        <Link to="/cr"><CreateRoomPage /></Link>
        <Link to="/jp"><RoomJoinPage /></Link> */}
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
      <Route path="/room/:roomCode" element={<Room />} />
    </Route>
  )
);

function App() {

  return (
    <div className="center homePage-container">
      <RouterProvider router={router} />
    </div>
  )
}



export default App
