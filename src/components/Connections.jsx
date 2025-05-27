import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-2xl font-semibold flex items-center justify-center text-black mt-20">
        No Connections Found
      </h1>
    );

  return (
    <div className="px-4 py-10 min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold text-center mb-10">Connections</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm"
            >
              {/* Profile Image */}
              <img
                src={photoUrl}
                alt={`${firstName}'s photo`}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />

              {/* User Info */}
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-600">{`${age} yrs, ${gender}`}</p>
                )}
                {about && <p className="text-sm mt-1 text-gray-500">{about}</p>}
              </div>

              {/* Chat Button */}
              <Link to={`/chat/${_id}`}>
                <button className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-800 text-white font-medium transition">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
