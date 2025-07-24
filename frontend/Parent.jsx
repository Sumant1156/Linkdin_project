import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const datacontext = createContext();

function Parent({ children }) {
  const serverurl = "https://linkdin-backend-jo4v.onrender.com";
  let [userdata, setuserdata] = useState("");
  const [showedit, setshowedit] = useState(false);
  const [showpost, setshowpost] = useState(false);
  const [postdata, setpostdata] = useState([]);
  const getuser = async (req, res) => {
    try {
      let result = await axios.get(serverurl + "/getuser", {
        withCredentials: true,
      });
      setuserdata(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getpost = async () => {
    try {
      let result = await axios.get(serverurl + "/getpost", {
        withCredentials: true,
      });

      setpostdata(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const value = {
    serverurl,
    userdata,
    getpost,
    setuserdata,
    showedit,
    setshowedit,
    showpost,
    postdata,
    setshowpost,
  };
  useEffect(() => {
    getuser();
    getpost();
  }, []);
  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default Parent;
