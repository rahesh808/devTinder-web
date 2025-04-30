import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const resp = await axios.post("http://localhost:7778/signup", {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password,
      }, {withCredentials: true});
      console.log("Signup successful:", resp.data);
      dispatch(addUser(resp?.data?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data||"Something went wrong");
      console.error("Signup failed:", error.response ? error.response.data : error.message);
    }
  };

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
    <h2 className="card-title text-center">{isLogin ? "Login" : "Sign Up"}</h2>

    <div>
   { !isLogin &&
    <><fieldset className="fieldset">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text" value = {firstName} className="input" placeholder="Type here"
  onChange={(e) => setFirstName(e.target.value)} />

</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">LastName</legend>
  <input type="text" value = {lastName} className="input" placeholder="Type here"
  onChange={(e) => setLastName(e.target.value)} />

</fieldset>
</>}
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
    <button
  className="btn btn-primary"
  onClick={() => (isLogin ? handleLogin() : handleSignup())}
>
  {isLogin ? "Login" : "Sign Up"}
</button>
  </div>
    <p className="text-center">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Sign Up" : "Login"}
      </button>
    </p>
  </div>
</div>
  </div>;
};

export default Login;
