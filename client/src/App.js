import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/master.css'
import AppRouter from './router/AppRouter'
import { useSelector } from "react-redux"

function App() {
  const { isLight } = useSelector((state) => state.theme)
  useEffect(() => {
    isLight && JSON.parse(localStorage.getItem('theme'))
  }, [isLight])

  return (
    <div className={isLight ? 'app dark-mode' : 'app white'} >
      <AppRouter />
    </div >
  )
}

export default App;
