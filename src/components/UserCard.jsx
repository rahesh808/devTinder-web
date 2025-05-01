import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({user, status}) => {
  const dispatch = useDispatch();
  const fetchUserStatus = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
    dispatch(removeFeed(_id));
    }catch (error) {
      console.error("Error fetching user status:", error);
    }

  }
    // const {user} = props;
    const {_id, firstName, lastName, photoUrl, age, about, gender} = user;
    return <div className="">
        <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender &&<p>{age + " ,"+ gender}</p>}
    <p>{about}</p>
    {status && <div className="card-actions justify-center my-4">
        <button className="btn btn-primary" onClick={() => fetchUserStatus("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => fetchUserStatus("interested", _id)}>Interested</button>
    </div>}
  </div>
</div>
    </div>
}

export default UserCard;