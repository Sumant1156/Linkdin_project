import React, { useContext, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { datacontext } from "../Parent";
import { MdCameraAlt, MdCastForEducation } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import profile from "./assets/profile.png";
import axios from "axios";

function Editprofile() {
  const profileimg = useRef();
  const coverimg = useRef();
  const { showedit, setshowedit, userdata, setuserdata, serverurl } =
    useContext(datacontext);
  const [save, setsave] = useState(false);
  const [firstname, setfirstname] = useState(userdata.firstname || "");
  const [lastname, setlastname] = useState(userdata.lastname || "");
  const [email, setemail] = useState(userdata.email || "");
  const [username, setusername] = useState(userdata.username || "");
  const [password, setpassword] = useState(userdata.password || "");
  const [headline, setheadline] = useState(userdata.headline || "");
  const [location, setlocation] = useState(userdata.location || "");
  const [gender, setgender] = useState(userdata.gender || "");
  const [skills, setskill] = useState(userdata.skills || []);
  const [newskill, setnewskill] = useState("");
  let [education, seteducation] = useState(userdata.education || []);
  let [neweducation, setneweducation] = useState({
    college: "",
    degree: "",
    fieldofstudy: "",
  });
  const [frontentprofile, setfrontentprofile] = useState(
    userdata.profileimage || profile
  );
  let [backendprofile, setbackendprofile] = useState("");
  let [frontentcoverimg, setfrontentcoverimg] = useState(
    userdata.coverimage || ""
  );
  let [backendcoverimg, setbackendcoverimg] = useState(null);
  const addskill = () => {
    if (newskill && !skills.includes(newskill)) {
      setskill([...skills, newskill]);
    }
    setnewskill("");
  };
  const removeskill = (rskill) => {
    setskill(skills.filter((skill) => skill !== rskill));
  };
  const addeducation = () => {
    if (
      neweducation.college &&
      neweducation.fieldofstudy &&
      neweducation.degree
    ) {
      seteducation([...education, neweducation]);
    }
    setneweducation({
      college: "",
      degree: "",
      fieldofstudy: "",
    });
  };
  const removeeducation = (redu) => {
    seteducation(education.filter((education) => education !== redu));
  };

  const handleprofile = (e) => {
    let file = e.target.files[0];
    setbackendprofile(file);
    setfrontentprofile(URL.createObjectURL(file));
  };
  const handlecover = (e) => {
    let file = e.target.files[0];
    setbackendcoverimg(file);
    setfrontentcoverimg(URL.createObjectURL(file));
  };
  const handleeditprofile = async () => {
    try {
      setsave(true);
      let formdata = new FormData();
      formdata.append("firstname", firstname);
      formdata.append("lastname", lastname);
      formdata.append("email", email);
      formdata.append("username", username);
      formdata.append("password", password);
      formdata.append("headline", headline);
      formdata.append("location", location);
      formdata.append("gender", gender);
      formdata.append("skill", JSON.stringify(skills));
      formdata.append("education", JSON.stringify(education));
      if (backendprofile) {
        formdata.append("profileimage", backendprofile);
      }
      if (backendcoverimg) {
        formdata.append("coverimage", backendcoverimg);
      }
      let user = await axios.put(serverurl + "/updateprofile", formdata, {
        withCredentials: true,
      });
      setuserdata(user.data);
      setsave(false);
      setshowedit(false);
    } catch (err) {
      setsave(false);
      console.log("form dataerr", err);
    }
  };
  return (
    <div className="h-[100vh] w-full fixed top-0 flex justify-center items-center gap-[10px]   z-[100]  ">
      <input type="file" hidden ref={profileimg} onChange={handleprofile} />
      <input type="file" hidden ref={coverimg} onChange={handlecover} />

      <div className="h-screen w-full absolute top-0 bg-black opacity-[0.5]   "></div>
      <div className="w-[90%] max-w-[400px] h-[600px] bg-white shadow-lg rounded-lg relative z-[200]  overflow-auto p-[10px] mt-[50px]  ">
        <div className=" right-[10px] top-[8px] absolute">
          <RxCross2
            className="text-gray-800 font-bold w-[25px] h-[25px] cursor-pointer"
            onClick={() => setshowedit(false)}
          />
        </div>
        <div className="bg-gray-500 w-full h-[100px] rounded-md mt-[30px] overflow-hidden ">
          <img src={frontentcoverimg} alt="" className="w-full" />
          <MdCameraAlt
            className="h-[25px] w-[25px] text-white absolute right-4 top-[40px] cursor-pointer"
            onClick={() => coverimg.current.click()}
          />
        </div>
        <div className="h-[70px] w-[70px] rounded-full overflow-hidden absolute top-[98px] left-[30px]">
          <img src={frontentprofile} alt="" />
        </div>
        <div
          className="absolute left-[85px] top-[130px] bg-[#28e8fa] rounded-full flex justify-center items-center cursor-pointer z-30 h-[20px] w-[20px] "
          onClick={() => profileimg.current.click()}
        >
          <FaPlus />
        </div>

        <div className="w-full  gap-[20px] flex flex-col mt-[40px]   ">
          <input
            type="text"
            placeholder="firstname"
            className="outline-none border-gray-500 border-[2px] p-[5px]  rounded-lg h-[50px]  text-[18px]"
            value={userdata.firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="lastname"
            className="outline-none w-full  border-[2px] border-gray-500 p-[5px] rounded-lg h-[50px]  text-[18px]"
            value={userdata.lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg  h-[50px]  text-[18px]"
            value={userdata.email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="username"
            placeholder="username"
            className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg  h-[50px]  text-[18px]"
            value={userdata.username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg  h-[50px]  text-[18px]"
            value={userdata.password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="headline"
            className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg  h-[50px]  text-[18px]"
          />
          <input
            type="text"
            placeholder="location"
            className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg  h-[50px]  text-[18px]"
            value={userdata.location}
            onChange={(e) => setlocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="gender (male/female/other)"
            className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg  h-[50px]  text-[18px]"
            value={userdata.gender}
            onChange={(e) => setgender(e.target.value)}
          />
          <div className="border-2 border-gray-500 w-full min-h-[50px] flex items-center gap-[10px] p-[5px] flex-col   text-[18px]">
            <h1 className="text-[19px] font-semibold">skills</h1>
            {skills && (
              <div className="w-full flex flex-col gap-[10px]">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="outline-none border-[2px] border-gray-500 bg-gray-200 p-[5px] rounded-lg w-full  h-[50px] relative  text-[18px]"
                  >
                    {skill}
                    <span>
                      <RxCross2
                        className="text-gray-800 font-bold w-[25px] h-[25px] cursor-pointer absolute right-5 top-[13px]"
                        onClick={() => removeskill(skill)}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              placeholder="add new skill"
              value={newskill}
              onChange={(e) => setnewskill(e.target.value)}
              className="outline-none border-[2px] border-gray-500 p-[5px] rounded-lg w-full  h-[50px]  text-[18px]"
            />
            <button
              className=" rounded-full border-[3px] w-full h-[35px] border-[#0adce3] text-[#07b7bd] overflow-hidden my-3 flex justify-center items-center gap-[10px] "
              onClick={addskill}
            >
              Add
            </button>
          </div>
          <div className="border-2 border-gray-500 flex flex-col gap-[10px] min-h-[40px] w-full justify-center items-center">
            <h1 className="text-[19px] text-gray-600 font-semibold">
              Education
            </h1>

            {education && (
              <div className="flex flex-col gap-[10px] w-full p-[10px] relative">
                {education.map((edu) => (
                  <div className="border-2 border-gray-500 bg-gray-200 w-full ">
                    <div>college:{edu.college}</div>
                    <div>Degree:{edu.degree}</div>
                    <div>Fieldofstudy:{edu.fieldofstudy}</div>
                    <span>
                      <RxCross2
                        className="text-gray-800 font-bold w-[25px] h-[25px] cursor-pointer absolute right-5  top-[13px]"
                        onClick={() => removeeducation(edu)}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="w-full p-[10px]  flex  flex-col gap-[10px]">
              <input
                type="text"
                placeholder="college"
                className="outline-none w-full h-[50px] border-2 border-gray-500 rounded-lg px-[5px]  text-[18px] font-semibold "
                value={neweducation.college}
                onChange={(e) =>
                  setneweducation({
                    ...neweducation,
                    college: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="fieldofstudy"
                value={neweducation.fieldofstudy}
                className="outline-none w-full h-[50px]  border-2 border-gray-500  rounded-lg px-[5px] text-[18px] font-semibold"
                onChange={(e) =>
                  setneweducation({
                    ...neweducation,
                    fieldofstudy: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="degree"
                className="outline-none w-full h-[50px] border-2 border-gray-500
                rounded-lg px-[5px] text-[18px] font-semibold  "
                value={neweducation.degree}
                onChange={(e) =>
                  setneweducation({ ...neweducation, degree: e.target.value })
                }
              />
            </div>
            <button
              className=" rounded-full border-[3px] w-full h-[35px] border-[#0adce3] text-[#07b7bd] overflow-hidden my-3 flex justify-center items-center gap-[10px] "
              onClick={addeducation}
            >
              Add
            </button>
          </div>
          <button
            className=" rounded-full border-[3px] w-full h-[35px] border-[#0adce3] text-[#07b7bd] overflow-hidden my-3 flex justify-center items-center gap-[10px] "
            onClick={handleeditprofile}
          >
            {save ? "saving..." : "Edit profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
