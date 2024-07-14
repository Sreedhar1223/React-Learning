import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {readConfigurationsData,readModuleConfigurationsData } from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserData } from "../../Features/loginData";
import Button from 'react-bootstrap/Button';
import '../Header/Header.css'
const Header = () => {
  const [applicationData, setApplicationData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getApplicationData()
  }, []);
  const getModuleConfigurationData = async (moduleFilePath) => {
    try {
      const result = await readModuleConfigurationsData(moduleFilePath);
      setModuleData(result);
      if(sessionStorage.getItem('selectedPage')){
        let selectedPage = JSON.parse(sessionStorage.getItem('selectedPage'))
        navigate(selectedPage?.routePath);
        setSelectedPage(selectedPage)
      }else{
        setSelectedPage(result?.pages[0])
        navigate(result?.pages[0]?.routePath);
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };
  const getModuleData = (data,isRemoveSelectedPage) => {
    const environmentName = process.env.NODE_ENV;
    sessionStorage.setItem('selectedModule',JSON.stringify(data))
    if(isRemoveSelectedPage){
      sessionStorage.removeItem('selectedPage')
      handleClose()
    }
    const moduleFilePath = environmentName === "development"? data?.devFilePath:data?.prodFilePath;
    getModuleConfigurationData(moduleFilePath);
   
  };

  const getApplicationData = async () => {
    try {
      const result = await readConfigurationsData();
      setApplicationData(result);
      if(sessionStorage.getItem('selectedModule')){
        let selectedModule= JSON.parse(sessionStorage.getItem('selectedModule'))
        getModuleData(selectedModule,false)
      }else{
        getModuleData(result.modules[0],false)
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };
  
  const getSelectedPage = (data) =>{
    setSelectedPage(data)
    sessionStorage.setItem('selectedPage',JSON.stringify(data))
  }
  const logOut = (event) =>{
    event.preventDefault();
    sessionStorage.removeItem('is_logged')
    sessionStorage.removeItem('selectedPage')
    sessionStorage.removeItem('selectedModule')
    dispatch(addUserData(null));
    navigate("/login-management/login");
  }

  return (
    <div>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-primary p-0">
          <Button onClick={handleShow}><Navbar.Toggle/></Button>
          <div>{moduleData?.moduleName}</div>
          <Navbar.Brand className="d-flex align-items-center">
            {moduleData?.pages.map((data, index) => {
              return (
                <div onClick={()=>getSelectedPage(data)} className="ms-2" >
                  <Link key={index} to={data.routePath} style={{ textDecoration: "none", color: data.color }} className={data?.pageName === selectedPage?.pageName?'selected-page':''}>
                    {data.pageName}
                  </Link>
                </div>
              );
            })}
            <button className="ms-2 btn" onClick={logOut}>Logout</button>
          </Navbar.Brand>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Module Switcher
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
                {applicationData?.modules.map((data, index) => {
                  return (
                    <div onClick={()=>getModuleData(data,true)} style={{ marginTop: "10px" }} className={data.key === moduleData?.key?'bg-primary p-2':'' }>
                    <Link key={index} to={data.routePath} style={{ textDecoration: "none" }} className={data.key === moduleData?.key?'text-light':'' } >
                      {data.moduleName}
                    </Link>
                    </div>
                  );
                })}
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
      ))}
    </div>
  );
};

export default Header;
