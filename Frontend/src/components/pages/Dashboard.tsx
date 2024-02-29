import { useState } from "react"
import AppBar from "../ui/AppBar"
import Balance from "../ui/Balance"
import Users from "../ui/Users"

const Dashboard = () => {
  const [balance, setBalance] =useState()
  const token = localStorage.getItem('token')
  return (
    <div>
        <AppBar/>
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
  )
}

export default Dashboard