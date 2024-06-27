import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Header/Header';
import DeploymentModule from './Pages/Deplyment-Management/Container'
import LicenseModule from './Pages/License-Management/Container'
import LoginModule from './Pages/Login-Management/Container'
import Signup from './Pages/Login-Management/Signup'
import Login from './Pages/Login-Management/Login'
import Insights from './Pages/Deplyment-Management/Insights'
import Analytics from './Pages/Deplyment-Management/Analytics'
import Uam from './Pages/Deplyment-Management/Uam'
import Infrastructure from './Pages/Deplyment-Management/Infrastructure'
import Home from './Pages/License-Management/Home'
import UserLog from './Pages/License-Management/UserLog'
import Dashboard from './Pages/License-Management/Dashboard'
function App() {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
       <Routes>
        <Route path='deployment-management' element={<DeploymentModule/>}>
         <Route path='' element={<Insights/>}></Route>
         <Route path='insights' element={<Insights/>}></Route>
         <Route path='analytics' element={<Analytics/>}></Route>
         <Route path='uam' element={<Uam/>}></Route>
         <Route path='infrastructure' element={<Infrastructure/>}></Route>
        </Route>
        <Route path='license-management' element={<LicenseModule/>}>
         <Route path='' element={<Home/>}></Route>
         <Route path='home' element={<Home/>}></Route>
         <Route path='user-log' element={<UserLog/>}></Route>
         <Route path='dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route path='login-management' element={<LoginModule/>}>
         <Route path='' element={<Login/>}></Route>
         <Route path='login' element={<Login/>}></Route>
         <Route path='signup' element={<Signup/>}></Route>
        </Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
