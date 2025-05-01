import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser}   from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [toast, setToast] = useState(false);

    
    const saveProfile = async () => {
        setError("");
       try {

        const resp = await axios.patch(`${BASE_URL}/profile/edit`, {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        }, { withCredentials: true });

        dispatch(addUser(resp?.data?.data));
        setToast(true);
        setTimeout(() => {
            setToast(false);
        }, 3000);

       } catch (error) {
        setError(error?.response?.data);
           console.error("Error saving profile:", error);
       }
       

    }

   

  return( 
    <div>
    <div className="flex my-10 justify-center">
  <div className="flex justify-center">
  <div className="flex justify-center mx-10">
  <div className="card card-border bg-base-300 w-96">
<div className="card-body">
  <h2 className="card-title">Edit Profile</h2>

  <div>
  <fieldset className="fieldset">
<legend className="fieldset-legend">FirstName :</legend>
<input type="text" value = {firstName} className="input" placeholder="Type here"
onChange={(e) => setFirstName(e.target.value)} />

</fieldset>
<fieldset className="fieldset">
<legend className="fieldset-legend">Last Name</legend>
<input type="text" value = {lastName} className="input" placeholder="Type here" 
onChange={(e) => setLastName(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
<legend className="fieldset-legend">PhotoURL</legend>
<input type="text" value = {photoUrl} className="input" placeholder="Type here" 
onChange={(e) => setPhotoUrl(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
<legend className="fieldset-legend">Age</legend>
<input type="text" value = {age} className="input" placeholder="Type here" 
onChange={(e) => setAge(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
<legend className="fieldset-legend">Gender</legend>
<input type="text" value = {gender} className="input" placeholder="Type here" 
onChange={(e) => setGender(e.target.value)} />

</fieldset>

<fieldset className="fieldset">
<legend className="fieldset-legend">About</legend>
<input type="text" value = {about} className="input" placeholder="Type here" 
onChange={(e) => setAbout(e.target.value)} />

</fieldset>
<p className="text-red-500">{error}</p>
  </div>
  
  
  <div className="card-actions justify-center">
    <button className="btn btn-primary" onClick={saveProfile}>Submit</button>
  </div>
</div>
</div>
</div>


</div>
<UserCard user = {{firstName, lastName, photoUrl, age, about, gender}} status = {false} />
</div>
{ toast && <div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Profile saved Successfully</span>
  </div>
</div>
}
</div>
);
};

export default EditProfile;