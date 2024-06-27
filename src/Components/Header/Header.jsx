import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {readConfigurationsData,readModuleConfigurationsData } from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [applicationData, setApplicationData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getApplicationData()
  }, []);
  const getModuleConfigurationData = async (moduleFilePath) => {
    try {
      const result = await readModuleConfigurationsData(moduleFilePath);
      setModuleData(result);
      navigate(result?.pages[0]?.routePath);
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };
  const getModuleData = (data) => {
    const environmentName = process.env.NODE_ENV;
    const moduleFilePath = environmentName === "development"? data?.devFilePath:data?.prodFilePath;
    getModuleConfigurationData(moduleFilePath);
  };

  const getApplicationData = async () => {
    try {
      const result = await readConfigurationsData();
      setApplicationData(result);
      getModuleData(result.modules[0])
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-primary">
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Brand className="d-flex">
            {moduleData?.pages.map((data, index) => {
              return (
                <div key={index} className="ms-2" >
                  <Link key={index} to={data.routePath} style={{ textDecoration: "none", color: data.color }} >
                    {data.pageName}
                  </Link>
                </div>
              );
            })}
          </Navbar.Brand>
          <Navbar.Offcanvas>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Module Switcher
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {applicationData?.modules.map((data, index) => {
                  return (
                    <div onClick={()=>getModuleData(data)}>
                    <Link key={index} to={data.routePath} style={{ textDecoration: "none" }} >
                      {data.moduleName}
                    </Link>
                    </div>
                  );
                })}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      ))}
    </div>
  );
};

export default Header;
