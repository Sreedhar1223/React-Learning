import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Header/Header';
import DeploymentModule from './Pages/Deplyment-Management/Container'
import LoginModule from './Pages/Login-Management/Container'
import Signup from './Pages/Login-Management/Signup'
import Login from './Pages/Login-Management/Login'
import Insights from './Pages/Deplyment-Management/Insights'
import Analytics from './Pages/Deplyment-Management/Analytics'
import Uam from './Pages/Deplyment-Management/Uam'
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
