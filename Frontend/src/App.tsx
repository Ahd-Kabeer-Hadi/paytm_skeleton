import { BrowserRouter, Navigate, Route, Routes, json } from "react-router-dom";
import "./App.css";
import Signup from "./components/pages/Signup";
import Signin from "./components/pages/Signin";
import Dashboard from "./components/pages/Dashboard";
import SendMoney from "./components/pages/SendMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetchCurrentUser from "./components/hooks/useFetchCurrentUser";

function App() {
  const { currentUser, error, loading } = useFetchCurrentUser();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    currentUser ? setIsLoggedIn(true) : false;
  }, [currentUser]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching login state data:", error);
      setIsLoggedIn(false);
    }
  }, [error]);

  useEffect(() => {if (!loading && !currentUser) {
    setIsLoggedIn(false)
  }}, [error, loading]);

 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
