import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SignIn from '../components/SignIn/SignIn'
import { ISAUTH } from '../constants/actionType'


const PrivateRoute = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector((state) => state.auth)
    useEffect(() => {
        sessionStorage.getItem('profile') && dispatch({ type: ISAUTH })
    }, [])
    return (
        isAuth ? <Outlet /> : <SignIn />
    )
}

export default PrivateRoute

