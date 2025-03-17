import React, { useContext, useState } from "react";
import { AppContext } from "../Context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {useNavigate} from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AppContext);
  //for gmail updation pupropse
  const [gmail, setgmail] = useState("");
  //for password updation purpose
  const [password, setpassword] = useState("");
  //for submit purpose
  const loginHandler = async (e) => {
    e.preventDefault();
    const result = await login(gmail, password);
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    console.log(result.data);
    setTimeout(()=>{
   navigate("/")
    },2000)
  };



  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={11}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div
        className="container my-5 pd-5"
        style={{
          border: "3px solid  grey ",
          borderRadius: "10%",
          width: "500px",
        }}
      >
        <h2 className="text-center">Login</h2>
        <form
          onSubmit={loginHandler}
          style={{ width: "400px", margin: "auto" }}
          className="my-3 pd-3"
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={gmail}
              onChange={(e) => setgmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="container d-grid col-6">
            <button type="submit" className="btn btn-primary my-3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Login;
