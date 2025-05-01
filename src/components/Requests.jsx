import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests.requests);

    const fetchRequests = async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            dispatch(addRequests(resp?.data?.data));
        }catch (error) {
            console.error("Error fetching requests:", error);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
          await axios.post(`${BASE_URL}/request/receive/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [])

    if(!requests) return null;

    if(requests.length === 0) return <h1 className="text-bold text-center">No Connection requests</h1>;
    
  return (
    <div className="items-center text-center my-10">
      <h1 className="text-bold text-white text-2xl">Requests</h1>

      {requests.map((request) => {
        const {firstName, lastName, photoUrl, age, gender, about, _id} = request.fromUserId;
        return (
          <div key = {_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto">
            <div className="">
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="profile"
              />
              </div>
              <div className="text-left mx-4" >
                <h1 className="text-white">
                  {firstName + " " + lastName}
                </h1>
                {age && gender && <p className="text-white">{age + "," + gender}</p>}
                <p className="text-white">{about}</p>
              </div>
            <div>
            <button
  className="btn btn-primary mx-2"
  onClick={() => reviewRequest("accepted", request._id)}
>
  Accept
</button>
<button
  className="btn btn-secondary mx-2"
  onClick={() => reviewRequest("rejected", request._id)}
>
  Reject
</button>    </div>
           
          </div>
        );
      })}
    </div>
  );
}

export default Requests;