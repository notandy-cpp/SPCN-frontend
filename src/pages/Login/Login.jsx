import {useState, useRef, useEffect, userContext, useContext} from "react";
import {Navigate, Link} from "react-router-dom";
import  AuthContext  from "../../context/AuthProvider.jsx";

import axios from "../../api/axios.jsx";
const LOGIN_URL = "/login";




function Login() {
    const setAuth = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() =>{
        userRef.current.focus();
    }, []);

    useEffect(() =>{
        setErrMsg("");
    }, [user, pwd]);


    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            const response = await axios.post(
                LOGIN_URL,
                {
                    username: user,
                    password: pwd,
                },
                {},
            );
            console.log(JSON.stringify(response));
            const userData = response?.data?.user;
            
            setAuth({user,pwd});
            setUser("");
            setPwd("");
            setSuccess(true);
        }
        catch (err){
          console.log(err.response.status);  
          if(!err?.response)
            {
              
              setErrMsg("Server không phản hồi");
            }
            else if(err.response?.status ===404)
            {
              setErrMsg("Tên người dùng không tồn tại");
            }
            else if(err.response?.status === 401)
            {
              setErrMsg("Mật khẩu không đúng");
            }
            else
            {
              setErrMsg("Đăng nhập thất bại")
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
          <p ref={errRef} className={errMsg ? "text-red-500" : "hidden"}>
            {errMsg}
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-4xl font-medium text-gray-900">Đăng nhập</h2>

            <div className="mt-10">
              <label className="font-medium">Username</label>
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
              />
            </div>

            <div className="mt-6">
              <label className="font-medium">Password</label>
              <input
                placeholder="Vui lòng nhập mật khẩu của bạn"
                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                required
                type="password"
                name="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
            >
              Đăng nhập
            </button>
            <p className="text-center py-8">
              Chưa có tài khoản?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Đăng ký
              </a>
            </p>
          </form>
        </main>
      )}
      ;
    </>
  );
  

}

export default Login;