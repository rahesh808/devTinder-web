import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  console.log(feed);
  const getFeed = async () => {
    if(feed) return;
    try {
    const resp = await axios.get('http://localhost:7778/user/feed', {withCredentials: true});
    dispatch(addFeed(resp?.data?.data));
    } catch (error) {
      console.log("Error in fetching feed", error);
    }
  }
  useEffect(() => {
    getFeed();
  }, []);
  return <div className=" flex justify-center my-10">
    {feed && <UserCard user={feed?.[0]} status = {true} />}
  </div>;
};

export default Feed;
