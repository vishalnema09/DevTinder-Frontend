import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdOutlineWc, MdOutlineCalendarToday } from "react-icons/md";

const UserCard = ({ user, showActions = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userID) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userID}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userID));
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  return (
    <div className="max-w-md w-full rounded-3xl overflow-hidden shadow-xl bg-white text-center mx-auto">
      {/* Gradient Top Section */}
      <div className="bg-gradient-to-b from-red-500 to-red-700 h-40 rounded-b-[70px] flex items-center justify-center relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={photoUrl}
            alt="user"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-20 pb-6 px-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {firstName} {lastName}
        </h2>

        <div className="w-16 h-1 bg-red-600 mx-auto my-4 rounded-full" />

        {/* Age & Gender */}
        <div className="flex justify-center gap-4 mt-2 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <MdOutlineCalendarToday className="text-red-600" />
            {age} years
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineWc className="text-red-600" />
            {gender}
          </div>
        </div>

        {/* About Section Moved Below */}
        <p className="text-gray-700 text-sm leading-relaxed mt-4">
          {about}
        </p>

        {showActions && (
          <div className="flex justify-center gap-6 mt-8">
            <button
              className="px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-100 transition"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
