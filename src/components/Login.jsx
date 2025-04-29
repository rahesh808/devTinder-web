import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("sachin@gmail.com");
  const [password, setPassword] = useState("Sachin@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resp = await axios.post("http://localhost:7778/login", {
        emailId: emailId,
        password: password,
      }, {withCredentials: true});
      //console.log("Login successful:", resp.data);
      dispatch(addUser(resp.data));
      navigate("/");
    } catch (error) {
      //console.log(error);
        setError(error?.response?.data||"Something went wrong");
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
  };
  return <div className="flex justify-center my-10 ">
    <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title">Login</h2>

    <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="text" value = {emailId} className="input" placeholder="Type here"
  onChange={(e) => setEmailId(e.target.value)} />

</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" value = {password} className="input" placeholder="Type here" 
  onChange={(e) => setPassword(e.target.value)} />
</fieldset>
    </div>
    <p className="text-red-500">{error}</p>
    
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
  </div>;
};

export default Login;
