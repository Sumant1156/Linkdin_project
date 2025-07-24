import logo2 from "../assets/logo2.png";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { ImUsers } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import profile from "../assets/profile.png";
import { useContext, useState } from "react";
import { datacontext } from "../../Parent";
import axios from "axios";

const Nav = () => {
  const [activesearch, setactivesearch] = useState(false);
  const { userdata, setuserdata, serverurl } = useContext(datacontext);
  const [showpopup, setshowpopup] = useState(false);
  const Handlesignout = async () => {
    try {
      axios.get(serverurl + "/logout", {
        withCredentials: true,
      });
      console.log("successfully logout");
      setuserdata("");
    } catch (err) {
      console.log("popup signup error", err);
    }
  };
  return (
    <div className="h-[80px] w-full bg-white shadow-lg flex  justify-between md:justify-around items-center fixed top-0 px-[5px] z-[200] left-0">
      <div className="flex gap-[10px] justify-center items-center">
        <div className=" ">
          <img src={logo2} alt="" className="w-[50px]" />
        </div>
        {!activesearch && (
          <div>
            <IoSearchSharp
              className="w-[23px] h-[23px] text-gray-600 lg:hidden"
              onClick={() => setactivesearch(true)}
            />
          </div>
        )}

        <form
          className={`flex bg-[#f0efe7] items-center px-[10px] py-[5px] rounded-md  h-[40px] lg:w-[350px] gap-[10px] w-[200px]  lg:flex ${
            activesearch ? "" : "hidden"
          }  `}
        >
          <div>
            <IoSearchSharp className="w-[23px] h-[23px] text-gray-600 " />
          </div>
          <input
            type="text"
            placeholder="search..."
            className="h-full w-[80%] bg-transparent outline-none border-none"
          />
        </form>
      </div>

      <div className="flex gap-[20px] items-center justify-center relative">
        {showpopup && (
          <div className="h-[250px] w-[250px] bg-white shadow-lg absolute top-[80px] right-[20px] rounded-md flex flex-col items-center p-[20px] gap-[10px]">
            <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
              <img src={userdata.profileimage} alt="" />
            </div>
            <div className="text-[20px] font-semibold text-gray-500">{`${userdata.firstname} ${userdata.lastname}`}</div>

            <button className=" rounded-full border-[3px] w-full h-[35px] border-[#0adce3] text-[#07b7bd] ">
              View Profile
            </button>
            <div className="border-[1px] border-gray-600 w-full"></div>
            <div className="flex w-full text-gray-600  ">
              <ImUsers className="w-[23px] h-[23px] text-gray-600 " />
              <div>My network</div>
            </div>
            <button
              className=" rounded-full border-[3px] w-full h-[35px] border-[#b31015] text-[#cf1b33] "
              onClick={Handlesignout}
            >
              Sign Out
            </button>
          </div>
        )}
        <div className="flex flex-col text-gray-600 items-center justify-center hidden lg:flex ">
          <IoMdHome className="w-[23px] h-[23px] text-gray-600" />
          <div>Home</div>
        </div>
        <div className="flex flex-col text-gray-600 items-center justify-center hidden lg:flex">
          <ImUsers className="w-[23px] h-[23px] text-gray-600  " />
          <div>My network</div>
        </div>
        <div className="flex flex-col text-gray-600 items-center justify-center">
          <IoIosNotifications className="w-[23px] h-[23px] text-gray-600" />
          <div className="hidden md:block">Notification</div>
        </div>
        <div
          className="h-[50px] w-[50px] rounded-full overflow-hidden cursor-pointer"
          onClick={() => setshowpopup((prev) => !prev)}
        >
          <img src={userdata.profileimage} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Nav;
