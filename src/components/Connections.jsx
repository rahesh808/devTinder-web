import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const resp = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
    dispatch(addConnection(resp?.data?.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return <h1 className="text-center text-white">No Connections</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-2xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;
        return (
          <div
            className="flex flex-col md:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-200 w-1/3 mx-auto shadow-lg"
            key={_id}
          >
            {/* Profile Section */}
            <div className="flex items-center">
              <img
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                src={photoUrl}
                alt="profile"
              />
              <div className="text-left mx-4">
                <h1 className="text-white text-lg font-bold">
                  {firstName + " " + lastName}
                </h1>
                {age && gender && (
                  <p className="text-gray-300 text-sm">{age + ", " + gender}</p>
                )}
                <p className="text-gray-400 text-sm">{about}</p>
              </div>
            </div>

           
            <div className="mt-4 md:mt-0">
              <Link to={`/chat/${_id}`}>
              <button className="btn btn-primary px-6 py-2 text-sm font-semibold">
                Chat
              </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;