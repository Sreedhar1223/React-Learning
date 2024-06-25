import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <div>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link to="/deployment-management/insights" style={{textDecoration:'none'}} closeButton>Deployment Management</Link>
                <Link to="/login-management/login" style={{textDecoration:'none'}} closeButton>Login Management</Link>
            </Nav>
        </div>
    )
}

export default Sidebar
