import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { fetchData} from '../Api/Api'
const Header = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-primary">
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Brand className='d-flex'>
            <div>
              hello
            </div>
            <div>
              hello
            </div>
            <div>
              hello
            </div>
          </Navbar.Brand>
          <Navbar.Offcanvas>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Module Switcher
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Sidebar />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      ))}
    </div>
  )
}

export default Header
