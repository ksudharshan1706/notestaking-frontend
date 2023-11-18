import React, { useState } from "react";
import "./Sign.css";
import axios from "axios";
import { loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ColorfulText({ children }) {
  return <a style={{ color: "#346BD4", cursor: "pointer" }}>{children}</a>;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Signup = () => {
    try {
      const userinfo = axios
        .post("auth/signup", {
          name: username,
          email,
          password,
        })
        .then((res) => {
          console.log("line 31", res.data);
          dispatch(loginSuccess(res.data));
          toast.success("Registration Success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error(`${error.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });

      console.log("userinfo", userinfo.data);
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="loginform">
      <label className="formlabel">User Name</label>
      <input
        className="inputfield"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="formlabel">Email address</label>
      <input
        className="inputfield"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="formlabel">Password</label>
      <input
        type="password"
        className="inputfield"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ marginLeft: "40px" }}></div>
      <button className="loginbtn" onClick={Signup}>
        Sign Up
      </button>
      <ToastContainer />
    </div>
  );
};

export default Register;
