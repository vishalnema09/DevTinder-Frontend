import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailID] = useState("vishal@gmail.com");
  const [password, setPassword] = useState("Vishal@77777");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        {
          withCredentials: true,
        }
      );
    dispatch(addUser(res.data));
    return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">LOGIN PAGE</h2>
          <div>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label my-4">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailID}
                // placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailID(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label my-4">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                // placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
