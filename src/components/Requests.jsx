import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center text-black text-xl font-semibold my-10">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center mt-12 mb-20 px-4 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserID;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mb-6 max-w-4xl mx-auto"
          >
            {/* Profile Image */}
            <img
              alt={`${firstName}'s photo`}
              className="w-24 h-24 rounded-full object-cover shadow-md mb-4 md:mb-0"
              src={photoUrl}
            />

            {/* User Info */}
            <div className="flex-1 md:mx-6 text-left">
              <h2 className="text-xl font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-600">{`${age} yrs, ${gender}`}</p>
              )}
              {about && <p className="text-sm mt-1 text-gray-500">{about}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="px-5 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 text-black font-medium transition"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-800 text-white font-medium transition"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
