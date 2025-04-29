import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    if (user) {
      
      return;
    }
    try {
    const resp = await axios("http://localhost:7778/profile/view", {withCredentials: true});
    console.log(resp.data);
    dispatch(addUser(resp.data));
    }catch (error) {
      if(error.response.status === 401) {
        navigate("/login");
      }

      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
