import { Link, useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faBookmark,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function RightSidebar()
{
    return (
        <aside className="w-16 bg-text text-[#D0C2B6] flex flex-col items-center py-8 rounded-full shadow-md gap-8 shrink-0 mt-4">
          <Link to="/profile" className="hover:text-white transition cursor-pointer" title="Cá nhân">
            <FontAwesomeIcon ic on={faUser} className="text-2xl" />
          </Link>
          <button className="hover:text-white transition cursor-pointer" title="Yêu thích">
            <FontAwesomeIcon icon={faHeart} className="text-2xl" />
          </button>
          <button className="hover:text-white transition cursor-pointer" title="Đã lưu">
            <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
          </button>
          <button className="hover:text-white transition cursor-pointer" title="Cài đặt">
            <FontAwesomeIcon icon={faGear} className="text-2xl" />
          </button>
          <button className="hover:text-red-400 transition cursor-pointer" title="Đăng xuất">
            <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl" />
          </button>
        </aside>
    )
}

export default RightSidebar;