import React, { useContext, useEffect, useRef, useState } from "react";
import Nav from "./component/Nav";
import { RxCross2 } from "react-icons/rx";
import profile from "./assets/profile.png";
import { FaPlus } from "react-icons/fa6";
import { MdCameraAlt } from "react-icons/md";
import { datacontext } from "../Parent";
import { GoPencil } from "react-icons/go";
import Editprofile from "./editprofile";
import { FaImages } from "react-icons/fa";
import Postcreate from "./Postcreate";
import axios from "axios";
axios.defaults.withCredentials = true;
function Home() {
  const {
    userdata,
    showedit,
    setshowedit,
    showpost,
    setshowpost,
    serverurl,
    postdata,
    getpost,
  } = useContext(datacontext);
  const [description, setdescription] = useState("");
  const [frontimage, setfrontimage] = useState("");
  const [backendimage, setbackendimage] = useState("");
  let image = useRef();
  const handleimage = (e) => {
    let file = e.target.files[0];
    setbackendimage(file);
    setfrontimage(URL.createObjectURL(file));
  };
  const Handlepost = async () => {
    try {
      let formdata = new FormData();
      formdata.append("description", description);
      if (backendimage) {
        formdata.append("image", backendimage);
      }
      let result = axios.post(serverurl + "/create", formdata, {
        withCredentials: true,
      });
      console.log(result);
      setshowpost(false);
      setdescription("");
    } catch (Error) {
      console.log(Error);
    }
  };
  useEffect(() => {
    getpost();
  }, []);
  return (
    <div className="h-screen overflow-auto w-full bg-[#f0efe7]  flex items-start flex-col justify-center pt-[100px] gap-[20px] px-[20px] lg:flex-row relative ">
      {showedit && <Editprofile></Editprofile>}
      <input type="file" hidden ref={image} onChange={handleimage} />
      <Nav></Nav>

      <div className="bg-white shadow-lg w-full lg:w-[25%] min-h-[260px] rounded-lg p-[10px]  relative ">
        <div className="bg-gray-500 w-full h-[100px] rounded-md overflow-hidden">
          <img src={userdata.coverimage} alt="" />
          <div className=" absolute right-5 top-[20px] ">
            <MdCameraAlt className="h-[25px] w-[25px] text-white " />
          </div>
        </div>
        <div className="h-[70px] w-[70px] rounded-full overflow-hidden absolute top-[70px] left-[30px]">
          <img src={userdata.profileimage} alt="" />
        </div>
        <div className="absolute left-[85px] top-[105px] bg-[#28e8fa] rounded-full flex justify-center items-center cursor-pointer z-30 h-[20px] w-[20px]">
          <FaPlus />
        </div>
        <div className="mt-[30px] text-[15px] font-semibold text-gray-500   ml-[10px]">
          <div className="">
            <div className="font-bold">
              {userdata.firstname} {userdata.lastname}
            </div>

            <div>{userdata.location} </div>
          </div>
        </div>
        <button
          className=" rounded-full border-[3px] w-full h-[35px] border-[#0adce3] text-[#07b7bd] overflow-hidden my-3 flex justify-center items-center gap-[10px] "
          onClick={() => setshowedit(true)}
        >
          Edit Profile
          <GoPencil />
        </button>
      </div>
      <div className="lg:w-[50%] w-full flex flex-col gap-[10px]   ">
        <div className="bg-white shadow-lg h-[100px] w-full  rounded-lg flex gap-[10px] p-[20px] justify-start ">
          <div className=" w-[70px] h-[70px] rounded-full overflow-hidden ">
            <img
              src={userdata.profileimage || profile}
              alt=""
              className="w-full overflow-hidden  "
            />
          </div>

          <button
            className="border-2 border-gray-500 rounded-full flex items-center w-[80%] h-[60px] p-[15px] text-[18px] font-semibold text-gray-600 hover:bg-gray-300"
            onClick={() => setshowpost(true)}
          >
            start a post
          </button>
        </div>
        {postdata.map((post, index) => (
          <Postcreate
            id={post._id}
            key={index}
            author={post.author}
            image={post.image}
            createdAt={post.createdAt}
            description={post.description}
            like={post.like}
            comment={post.Comment}
          />
        ))}
      </div>
      {showpost && (
        <div className="w-full h-screen absolute top-0  flex justify-center items-center left-0 ">
          <div className=" w-full h-screen bg-black z-[200] opacity-[0.6]  "></div>
          <div className="w-[90%] rounded-lg max-w-[500px] max-h-[90vh] bg-white shadow-lg absolute z-[200] flex p-[10px] gap-[10px] flex-col ">
            <div className=" right-[10px] top-[8px] absolute">
              <RxCross2
                className="text-gray-800 font-bold w-[25px] h-[25px] cursor-pointer"
                onClick={() => setshowpost(false)}
              />
            </div>
            <div className="flex  gap-[10px]">
              <div className="max-h-[60px] max-w-[60px] rounded-full overflow-hidden">
                <img
                  src={userdata.profileimage || profile}
                  alt=""
                  className=""
                />
              </div>
              <div className="flex mt-[10px] text-[18px] font-semibold">{`${userdata.firstname} ${userdata.lastname}`}</div>
            </div>
            <textarea
              className="w-full min-h-[100px] p-[10px] border-none resize-none outline-none "
              placeholder="what do you want to talk about ?"
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
            <div className="w-[50px] h-[120px] mt-[20px] rounded-full">
              <img src={frontimage || ""} alt="" />
            </div>
            <div className="mt-[120px] px-[10px] ">
              <FaImages
                className="cursor-pointer"
                onClick={() => image.current.click()}
              />
            </div>
            <hr className="border-2 border-gray-300 mt-[5px]" />
            <div className="flex justify-end pr-[5px]">
              <button
                className="rounded-full h-[40px] w-[80px] bg-[#1f8db1] text-white font-semibold "
                onClick={Handlepost}
              >
                post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg w-full lg:w-[25%] min-h-[200px] rounded-lg"></div>
    </div>
  );
}

export default Home;
