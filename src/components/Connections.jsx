import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
      const resp = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
        dispatch(addConnection(resp?.data?.data));
       
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if(connections.length === 0) return <h1 className="text-center text-white">No Connections</h1>

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-2xl">Connections</h1>

      {connections.map((connection) => {
        const {firstName, lastName, photoUrl, age, gender, about, _id} = connection;
        return (
          <div key = {_id} className="flex m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto">
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
            
           
          </div>
        );
      })}
    </div>
  );
};

export default Connections;