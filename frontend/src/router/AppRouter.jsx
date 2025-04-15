import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import Login from '../pages/Login'
import Register from '../pages/Register'

import Home from '../pages/Home'

import Homeworks from '../pages/Homeworks'

function Router() {

    const { user, userLoaded } = useAuthContext();

    if (!userLoaded) {
        return <div>Loading...</div>; // or a spinner
    }

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={user && user.user.role == "office" ? <Register /> : <Navigate to="/" />} />

                <Route path="/homework" element={user && user.user.role == "teacher" ? <Homeworks /> : <Navigate to="/" />} />

                <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Router
