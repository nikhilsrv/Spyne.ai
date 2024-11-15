import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";
import { useGlobalContext } from "../context/globalContext.jsx";
import { Link } from "react-router-dom";
const Signup = () => {
  const { loading, signup } = useSignup();
  const { authenticatedUser } = useGlobalContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (authenticatedUser) navigate("/user/allcars");
  }, [authenticatedUser]);

  const [userInput, setUserInput] = useState({
    fullName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    signup(userInput);
  };

  return (
    <div className="w-screen h-screen bg-[#FBFBFB]  flex justify-center items-center">
      <div className="w-96 bg-[white] shadow-xl border-[2px]  pt-5 py-10 border-black rounded-lg flex flex-col items-center px-4">
        <div className="text-3xl font-bold">Sign Up</div>
        <div className="w-full mt-5 flex flex-col gap-y-4">
          <input
            type="text"
            className="bg-[#E6E6E6] w-full h-10  font-bold border-[black] rounded-[20px] pl-4 pb-[2px]"
            placeholder="Fullname"
            onChange={(e) =>
              setUserInput({ ...userInput, fullName: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-[#E6E6E6] w-full h-10  font-bold border-[black] rounded-[20px] pl-4 pb-[2px]"
            placeholder="Email"
            onChange={(e) =>
              setUserInput({ ...userInput, emailId: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-[#E6E6E6] w-full h-10  font-bold border-[black] rounded-[20px] pl-4 pb-[2px]"
            placeholder="Password"
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-[#E6E6E6] w-full h-10  font-bold border-[black] rounded-[20px] pl-4 pb-[2px]"
            placeholder="Confirm Password"
            onChange={(e) =>
              setUserInput({ ...userInput, confirmPassword: e.target.value })
            }
          />
        </div>
        <div>
          {loading ? (
            <div className="mt-8 cursor-pointer">
              <button className="bg-[black] text-[white] px-10 font-bold py-1 rounded-3xl">
                <span className="spinner font-bold"></span>
              </button>
            </div>
          ) : (
            <div
              className="mt-8 cursor-pointer"
              onClick={(e) => handleClick(e)}
            >
              <button className="bg-[black] text-[white] px-8 font-bold py-2 rounded-3xl">
                Register
              </button>
            </div>
          )}
        </div>

        <div className="mt-2">Already registered ? <Link to="/login" className="text-[blue]">Login</Link></div>
      </div>
    </div>
  );
};

export default Signup;
