import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserData } from "../../../Features/loginData";
import '../Login/Login.css'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addUserDataHandler = (event) => {
    event.preventDefault();
    dispatch(addUserData({ username: username, password: password }));
    // navigate('/deployment-management/insights')
  };

  useEffect(() => {
    navigate("/login-management/login");
  }, []);

  return (
    <>
      <div className="d-flex w-100">
        <div className="w-50">
          <div class="container d-flex" style={{backgroundImage:"url(/Assets/Images/auth-panel.png)",height:"100vh"}}>
            <div class="container-panel m-auto">
              <img
                class="detectLogo pt-2 ps-3"
                src=''
                alt="Detect Logo"
              />
              <div class="productDefinition d-flex mx-auto my-4">
                <img
                  class="productLogo"
                  // src={productLogoUrl}
                  alt="Product Logo"
                />
                <div class="d-block ps-2">
                  <p class="mb-0 fs-18">
                    {/* <b>{ productName }</b> */}
                  </p>
                  <p class="productSubName mb-0 fs-14">
                    {/* <small>{ productSubName }</small> */}
                  </p>
                </div>
              </div>
              {/* <p class="text-center">Version: { softwareVersion }</p> */}
              <div class="copyrightCss mx-3">
                <p class="mb-0">
                  {/* ©{ currentYear }<b>Detect Technologies</b>. All Rights */}
                  Reserved.
                </p>
                <p>
                  Site best viewed in Chrome 74.0+, Firefox 67.0+, Microsoft
                  Edge 85.0+
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-50 position-relative">
          <div className="position w-50">
            <h1>Login</h1>
            <form onSubmit={addUserDataHandler}>
              <label className="mt-2 w-100">
                Username:
                <input
                  className="form-control w-100"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <br />
              <label className="mt-2 w-100">
                Password:
                <input
                  className="form-control w-100"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="submit" className="btn btn-primary w-100 mt-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
