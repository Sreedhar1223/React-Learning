import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Header/Header";
import DeploymentModule from "./Pages/Deplyment-Management/Container";
import LicenseModule from "./Pages/License-Management/Container";
import LoginModule from "./Pages/Login-Management/Container";
import Signup from "./Pages/Login-Management/Signup";
import Login from "./Pages/Login-Management/Login/Login";
import Insights from "./Pages/Deplyment-Management/Insights";
import Analytics from "./Pages/Deplyment-Management/Analytics";
import Uam from "./Pages/Deplyment-Management/Uam";
import Infrastructure from "./Pages/Deplyment-Management/Infrastructure";
import Home from "./Pages/License-Management/Home";
import UserLog from "./Pages/License-Management/UserLog";
import Dashboard from "./Pages/License-Management/Dashboard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loginConfigurationsData } from "./Components/Api/Api";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const userData = useSelector((state) => state?.loginData);
  // console.log('userData',userData)
  useEffect(() => {
    if(sessionStorage.getItem('is_logged')){
      setisLoggedIn(true);
    }
    if(userData !== null){
      loginCheck();
    }
  }, [userData]);
  const loginCheck = async () => {
    try {
      const result = await loginConfigurationsData();
      if (userData.text !== null) {
        result.users.filter((user) => {
          if (user.userName === userData.text?.username && user?.password === userData.text?.password) {
            setisLoggedIn(true);
            sessionStorage.setItem('is_logged',true)
          }
        });
      } else {
        if(sessionStorage.getItem('is_logged')){
          setisLoggedIn(true);
        }
        else{
          setisLoggedIn(false);
        }
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };
  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="deployment-management" element={<DeploymentModule />}>
              <Route path="" element={<Insights />}></Route>
              <Route path="insights" element={<Insights />}></Route>
              <Route path="analytics" element={<Analytics />}></Route>
              <Route path="uam" element={<Uam />}></Route>
              <Route path="infrastructure" element={<Infrastructure />}></Route>
            </Route>
            <Route path="license-management" element={<LicenseModule />}>
              <Route path="" element={<Home />}></Route>
              <Route path="home" element={<Home />}></Route>
              <Route path="user-log" element={<UserLog />}></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
            </Route>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path="" element={<LoginModule />}>
              <Route path="" element={<Login />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="signup" element={<Signup />}></Route>
            </Route>
            <Route path="login-management" element={<LoginModule />}>
              <Route path="" element={<Login />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="signup" element={<Signup />}></Route>
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
