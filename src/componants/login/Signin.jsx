import React, { useState } from "react";
import "./Sign.css";
// import {
//   apple,
//   discord,
//   github,
//   google,
//   linkedin,
//   loginleft,
//   twitter,
// } from "../../assets";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Loginform from "./Loginform";
import Register from "./Register";
function ColorfulText({ children }) {
  return <a style={{ color: "#346BD4", cursor: "pointer" }}>{children}</a>;
}
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signintoggle, setSignintoggle] = useState(true);
  console.log(signintoggle);
  return (
    <div className="signin">
      <div className="signinleft">
        <div className="signinleftdata">
          <div className="leftdata1 divitem">LOGO</div>
          <div className="leftdata2 divitem">Notesfilter.</div>
        </div>
      </div>
      <div className="logincard">
        <div className="Navbar">NotesFilter .</div>
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="signinheading">Sign In</div>
          <div className="signintoccount">Sign in to your account</div>
          <div className="autologinContainer"></div>
          {signintoggle ? <Loginform /> : <Register />}
          <div className="" onClick={() => setSignintoggle(!signintoggle)}>
            {signintoggle ? (
              <>
                Don’t have an account?{" "}
                <ColorfulText>Register here</ColorfulText>
              </>
            ) : (
              <>
                {" "}
                have an account? <ColorfulText>Sign In</ColorfulText>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
