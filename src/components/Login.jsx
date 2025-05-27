import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailID, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailID, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center pt-18">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#B22166" }}>
          {isLoginForm ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            isLoginForm ? handleLogin() : handleSignUp();
          }}
          className="space-y-4"
        >
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22166] text-black placeholder-black"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22166] text-black placeholder-black"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Email ID</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22166] text-black placeholder-black"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22166] text-black placeholder-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center mt-1">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-md font-semibold text-white bg-[#B22166] hover:bg-[#9a1c59] transition duration-200"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <p className="text-center mt-3 text-sm text-gray-700">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => setIsLoginForm((val) => !val)}
              style={{ color: "#B22166" }}
            >
              {isLoginForm ? "Sign Up here" : "Login here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
