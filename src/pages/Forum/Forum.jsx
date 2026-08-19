import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider.jsx";
import axios from "../../api/axios.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faChartColumn,
  faBowlFood,
  faCommentDots,
  faCircleQuestion,
  faUser,
  faHeart,
  faBookmark,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const FORUM_POSTS_URL = "/posts";

function Forum() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(FORUM_POSTS_URL);
        setPosts(response?.data || []);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Server không phản hồi");
        } else {
          setErrMsg("Không thể tải bài viết");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
        <>
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-gray-600">
              Đang tải bài viết...
            </div>
          ) : errMsg ? (
            <div className="flex-1 flex items-center justify-center text-red-500 font-medium">
              {errMsg}
            </div>
          ) : (
            <div className="flex-1 flex flex-col divide-y divide-gray-800">
              <div className="p-6 hover:bg-black/5 transition cursor-pointer flex flex-col justify-center min-h-32.5">
                <h3 className="font-semibold text-lg text-gray-900">Chủ đề thảo luận 1</h3>
                <p className="text-sm text-gray-600 mt-1">Nội dung tóm tắt bài viết diễn đàn...</p>
              </div>

              <div className="p-6 hover:bg-black/5 transition cursor-pointer flex flex-col justify-center min-h-32.5">
                <h3 className="font-semibold text-lg text-gray-900">Chủ đề thảo luận 2</h3>
                <p className="text-sm text-gray-600 mt-1">Nội dung tóm tắt bài viết diễn đàn...</p>
              </div>

              <div className="p-6 hover:bg-black/5 transition cursor-pointer flex flex-col justify-center min-h-32.5">
                <h3 className="font-semibold text-lg text-gray-900">Chủ đề thảo luận 3</h3>
                <p className="text-sm text-gray-600 mt-1">Nội dung tóm tắt bài viết diễn đàn...</p>
              </div>

              <div className="p-6 hover:bg-black/5 transition cursor-pointer flex flex-col justify-center min-h-32.5">
                <h3 className="font-semibold text-lg text-gray-900">Chủ đề thảo luận 4</h3>
                <p className="text-sm text-gray-600 mt-1">Nội dung tóm tắt bài viết diễn đàn...</p>
              </div>
            </div>
          )}
        
          </>
  );
}

export default Forum;