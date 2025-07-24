import React, { useContext } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import { datacontext } from "../Parent";
import React, { useContext } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import { datacontext } from "../Parent";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  const { userdata } = useContext(datacontext);

  return (
    <div>
      <Routes>
        <Route path="/" element={userdata ? <Home /> : <Login />}></Route>
        <Route
          path="/signup"
          element={userdata ? <Home /> : <Signup />}
        ></Route>
        <Route path="/login" element={userdata ? <Home /> : <Login />}></Route>
      </Routes>
    </div>
  );
}

export default App
axios.defaults.withCredentials = true;
function App() {
  const { userdata } = useContext(datacontext);

  return (
    <div>
      <Routes>
        <Route path="/" element={userdata ? <Home /> : <Login />}></Route>
        <Route
          path="/signup"
          element={userdata ? <Home /> : <Signup />}
        ></Route>
        <Route path="/login" element={userdata ? <Home /> : <Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
