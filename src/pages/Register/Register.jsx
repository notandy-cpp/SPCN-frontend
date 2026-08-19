import {useState, useRef, useEffect, userContext, useContext} from "react";
import {Navigate, Link} from "react-router-dom";
import  AuthContext  from "../../context/AuthProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";


import axios from "../../api/axios.jsx";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/register";




function Register() {
    const setAuth = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    
    const [email,setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [confirmPwd, setconfirmPwd] = useState("");
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);


    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    }, []);

    useEffect(() =>{
        setErrMsg("");
    }, [user, pwd]);

    useEffect(() =>{
        setValidUser(USER_REGEX.test(user));
    }, [user]);

    useEffect(() =>{
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() =>{
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd]);

    useEffect(() =>{
        setValidConfirmPwd(pwd === confirmPwd && confirmPwd.length > 0);
    }, [confirmPwd, pwd]);


    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const validUser = USER_REGEX.test(user);
        const validEmail = EMAIL_REGEX.test(email);
        const validPwd = PWD_REGEX.test(pwd);
        if(!validUser || !validEmail || !validPwd) 
        {
            setErrMsg("Thông tin không hợp lệ!");
            return;
        }

        try
        {
            const response = await axios.post(
                REGISTER_URL,
                {
                    username: user,
                    email: email,
                    password: pwd,
                    confirmpwd: confirmPwd
                },
                {},
            );
            const userData = response?.data?.user;
            setAuth({user,pwd});
            setUser("");
            setPwd("");
            setSuccess(true);
        }
        catch (err){
                  if (!err?.response) {
              setErrMsg("Server không phản hồi");
            } else if (err.response?.data?.error) {
              setErrMsg(err.response?.data?.error);
            } else {
              setErrMsg("Đăng ký thất bại");
            }
            errRef.current.focus();
        }
    }
    


    return (
    <>
      {success ? (
        <section>
          <Navigate to="/" replace={true} />
        </section>
      ) : (
        <main className="flex items-center justify-center w-full px-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-4xl font-medium text-gray-900 pb-6 " >Đăng ký</h2>

            {errMsg && (
              <div className="bg-red-100 text-sm p-3 relative rounded-md flex flex-col gap-3 border border-red-50">
                <span className="block absolute w-1 rounded-full h-[80%] my-auto top-0 bottom-0 left-1.5 bg-red-500"></span>
                <div className="flex items-center gap-2.5 ml-2.5 text-red-500 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4.5 fill-current overflow-visible"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path
                      d="M256 0C114.508 0 0 114.497 0 256c0 141.493 114.497 256 256 256 141.492 0 256-114.497 256-256C512 114.507 397.503 0 256 0m0 472c-119.384 0-216-96.607-216-216 0-119.385 96.607-216 216-216 119.384 0 216 96.607 216 216 0 119.385-96.607 216-216 216"
                      data-original="#000000"
                    />
                    <path
                      d="M343.586 315.302 284.284 256l59.302-59.302c7.81-7.81 7.811-20.473.001-28.284-7.812-7.811-20.475-7.81-28.284 0L256 227.716l-59.303-59.302c-7.809-7.811-20.474-7.811-28.284 0s-7.81 20.474.001 28.284L227.716 256l-59.302 59.302c-7.811 7.811-7.812 20.474-.001 28.284 7.813 7.812 20.476 7.809 28.284 0L256 284.284l59.303 59.302c7.808 7.81 20.473 7.811 28.284 0s7.81-20.474-.001-28.284"
                      data-original="#000000"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-red-500">Đã xảy ra lỗi!</p>
                    <p ref={errRef} className="text-xs text-red-500 mt-0.5">
                      {errMsg}
                    </p>
                  </div>
                </div>
              </div>
            )}
            

            <div className="mt-10">
              <label className="font-medium">
                Username
                
                {validUser && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 pl-0.5"
                  />
                )}
                {validUser || (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-500 pl-0.5"
                  />
                )}

                </label>
              <input
                placeholder="Vui lòng nhập tên người dùng của bạn"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                required
                type="text"
                name="username"
                ref={userRef}
                autoComplete="off"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </div>

            <div className="mt-10">
              <label className="font-medium">Email
                {validEmail && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 pl-0.5"
                  />
                )}
                {validEmail || (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-500 pl-0.5"
                  />
                )}
              </label>
              <input
                placeholder="Vui lòng nhập email của bạn"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                required
                type="text"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>

            <div className="mt-6">
              <label className="font-medium">Password
                {validPwd && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 pl-0.5"
                  />
                )}
                {validPwd || (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-500 pl-0.5"
                  />
                )}
              </label>
              <input
                placeholder="Vui lòng nhập mật khẩu của bạn"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                required
                type="password"
                name="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
            </div>

            <div className="mt-6">
              <label className="font-medium">Confirm Password
                {validConfirmPwd && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 pl-0.5"
                  />
                )}
                {validConfirmPwd || (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-red-500 pl-0.5"
                  />
                )}
              </label>
              <input
                placeholder="Vui lòng xác nhận mật khẩu của bạn"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                required
                type="password"
                name="confirmPassword"
                value={confirmPwd}
                onChange={(e) => setconfirmPwd(e.target.value)}
                onFocus={() => setConfirmPwdFocus(true)}
                onBlur={() => setConfirmPwdFocus(false)}
              />
            </div>






            <button
              type="submit"
              className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
            >
              Đăng ký
            </button>
            <p className="text-center py-8">
              Đã có tài khoản?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Đăng nhập
              </a>
            </p>
          </form>
        </main>
      )}
      ;
    </>
  );
  

}

export default Register;