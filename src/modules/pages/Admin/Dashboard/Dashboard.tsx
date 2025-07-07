import React, { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../../../contexts/AuthContext";


export default function Dashboard() {
  let {setUserData,userData} = useContext(AuthContext)
  let location = useLocation()
  console.log(location.state);
  

  useEffect(()=>{
  setUserData(location.state)
  
  },[userData])
  return (
    <div>Dashboard</div>
  )
}
