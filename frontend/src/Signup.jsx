import React, { useContext, useState } from "react";
import logo from "/src/assets/logo.svg";
import { useNavigate } from "react-router";
import { datacontext } from "../Parent.jsx";
import axios from "axios";

function Signup() {
  const { setuserdata } = useContext(datacontext);
  const { serverurl } = useContext(datacontext);
  const [show, setshow] = useState(false);
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const Handleonsubmit = async (e) => {
    e.preventDefault();

    try {
      setload(true);
      let result = await axios.post(
        `${serverurl}/signup`,

        {
          firstname,
          lastname,
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      setload(false);
      setfirstname("");
      setlastname("");
      setemail("");
      setusername("");
      setpassword("");
      setuserdata(result.data);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className="bg-white w-full h-screen flex-col items-center justify-start  flex ">
      <div className="p-[30px] lg:p-[35px] w-full h-[80px] flex items-center w-full rounded-md ">
        <img src={logo} alt="" />
      </div>
      <form
        className="w-[90%] max-w-[400px] h-[600px] shadow-xl flex flex-col justify-center p-[10px] gap-[10px]"
        onSubmit={Handleonsubmit}
      >
        <h1 className="text-gray-800 font-semibold text-[30px] mb-[30px] w-full ">
          Sign Up
        </h1>
        <input
          type="text"
          placeholder="firstname"
          value={firstname}
          className="border-black text-gray-600 text-[18px] border-gray-600  border-[2px] h-[50px] w-full rounded-md px-[10px] py-[10px]"
          onChange={(e) => setfirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastname}
          className="border-black border-[2px] h-[50px]  text-gray-600 text-[18px] border-gray-600 w-full rounded-md px-[10px] py-[10px]"
          onChange={(e) => setlastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="userName"
          value={username}
          className="border-black border-[2px] h-[50px]  text-gray-600 text-[18px] border-gray-600 w-full rounded-md px-[10px] py-[10px]"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          className="border-black border-[2px] h-[50px]  text-gray-600 text-[18px] border-gray-600 w-full rounded-md px-[10px] py-[10px]"
          onChange={(e) => setemail(e.target.value)}
        />
        <div className="w-full   flex flex-row border-black border-[2px] h-[50px]  text-gray-600 rounded-md relative border-gray-600">
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            value={password}
            className=" rounded-md h-fullborder-none text-gray-600 text-[18px] w-full  px-[10px] py-[10px] required"
            onChange={(e) => setpassword(e.target.value)}
          />
          <span
            className=" flex absolute right-[20px] top-[10px] text-blue-400 cursor-pointer font-semibold "
            onClick={() => setshow((prev) => !prev)}
          >
            {show ? "Hidden" : "show"}
          </span>
        </div>
        <button className="bg-[#28c0e2] h-[50px] rounded-full w-full mt-[30px]">
          {load ? "Loading..." : "Sign Up"}
        </button>
        <p className="text-black font-semibold ml-[60px] ">
          Already have an account?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
