import moment from "moment/moment";
import { FaRegCommentDots } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { AiFillLike, AiOutlineSecurityScan } from "react-icons/ai";
import { datacontext } from "../Parent";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { IoMdTrendingUp } from "react-icons/io";
import { io } from "socket.io-client";
let socket = io("https://linkdin-project-5tpo.onrender.com");
function Postcreate({
  id,
  author,
  image,
  createdAt,
  description,
  like,
  comment,
  profileimage,
}) {
  const [dolike, setdolike] = useState(false);
  const [likes, setlikes] = useState(like || []);
  const { serverurl, getpost, userdata } = useContext(datacontext);
  const [showcomment, setshowcomment] = useState(false);
  const [comments, setcomments] = useState(comment || []);
  const [commentuser, setcommentuser] = useState("");
  const handlelike = async () => {
    try {
      let result = await axios.get(serverurl + `/like/${id}`, {
        withCredentials: true,
      });

      setlikes(result.data.like);
    } catch (err) {
      console.log(err);
    }
  };
  const handlecomment = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverurl + `/comment/${id}`,
        { commentuser },
        {
          withCredentials: true,
        }
      );

      setcomments(result.data.Comment);
      console.log(result.data.Comment);
      console.log(comments);
      setcommentuser("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.on("likeupdated", ({ postid, likes }) => {
      if (postid == id) {
        setlikes(likes);
      }
    });
    return () => {
      socket.off("likeupdated");
    };
  }, [id]);
  useEffect(() => {
    getpost();
  }, [likes, setlikes, comments, setcomments]);
  return (
    <div className="w-full flex flex-col min-h-[200px] bg-white p-[10px] gap-[10px] ">
      <div className="flex items-center gap-[8px]">
        <div className="h-[70px] w-[70px] rounded-full overflow-hidden ">
          <img src={author.profileimage || ""} alt="" className="" />
        </div>
        <div>
          <div className="text-[18px] font-semibold text-gray-500">{`${author.firstname} ${author.lastname}`}</div>
          <div className="text-[12px] text-gray-500 ">
            {moment(createdAt).fromNow()}
          </div>
        </div>
      </div>
      <div>{description}</div>
      <div className=" flex justify-center   ">
        <div className="max-w-[300px] max-h-[300px] overflow-hidden ">
          <img src={image} alt="" className=" rounded-xl " />
        </div>
      </div>
      <div className="">
        <div className="flex justify-between  border-b-2 p-[20px] border-gray-500">
          <div className="flex gap-[5px] items-center">
            <AiFillLike className=" text-[#45b5f2]" />
            <span>{likes.length}</span>
          </div>
          <div className="flex gap-[5px] items-center">
            {comment.length} <span>comments</span>
          </div>
        </div>

        <div className="p-[20px] flex justify-start gap-[20px] w-full cursor-pointer ">
          {!like.includes(userdata._id) && (
            <div
              className={`flex items-center justify-center gap-[5px] cursor-pointer"
            }`}
              onClick={handlelike}
            >
              <AiFillLike className="" /> <span>Like</span>
            </div>
          )}
          {like.includes(userdata._id) && (
            <div
              className={`flex items-center justify-center gap-[5px] cursor-pointer text-[#1280c9] "
            }`}
              onClick={handlelike}
            >
              <AiFillLike className="" /> <span>Liked</span>
            </div>
          )}
          <div
            className="flex items-center justify-center gap-[5px]   "
            onClick={() => setshowcomment((prev) => !prev)}
          >
            <FaRegCommentDots /> <span>comment</span>
          </div>
        </div>
        {showcomment && (
          <>
            <form
              className="flex justify-between items-center border-b-2 border-gray-500 "
              onSubmit={handlecomment}
            >
              <input
                type="text"
                placeholder="leave a comment"
                className="outline-none  w-full p-[10px]"
                value={commentuser}
                onChange={(e) => setcommentuser(e.target.value)}
              />
              <button>
                <AiOutlineSend className="w-[18px] h-[18px] text-[#1a28e7]" />
              </button>
            </form>

            {comments.map((com) => (
              <div className="p-[10px] gap-[10px] border-b-2 border-gray-500">
                <div className="flex items-center gap-[5px]">
                  <div className="h-[40px] w-[40px] rounded-full overflow-hidden ">
                    <img
                      src={com.user.profileimage || ""}
                      alt=""
                      className=""
                    />
                  </div>
                  <div>
                    {com.user.firstname} {com.user.lastname}
                  </div>
                </div>
                <div className="p-[10px] ml-[40px] text-gray-600 text-[18px]">
                  {com.content}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Postcreate;
