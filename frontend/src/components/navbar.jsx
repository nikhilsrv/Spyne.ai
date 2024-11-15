import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
import toast from "react-hot-toast";
const Navbar = () => {
  const { authenticatedUser,setAuthenticatedUser } = useGlobalContext();
  const handleClick=async()=>{
    try {
			const res = await fetch("https://spyne-ai-one.vercel.app/api/user/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
        
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.removeItem("car-user")
			setAuthenticatedUser(null);
		} catch (error) {
			toast.error(error.message);
		}
  }
  return (
    <div className="w-screen flex justify-between px-10 py-2 mb-10 border-b-[2px]">
      <div className="text-3xl font-bold">CARIFY</div>
      <div>
        {authenticatedUser ? (
            <div className="cursor-pointer  bg-[green] text-[white] font-bold px-5 py-2 rounded-lg" onClick={handleClick}>
              Logout
            </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/signup">
              <div className="bg-[green] text-[white] font-bold px-5 py-2 rounded-lg">
                Signup
              </div>
            </Link>
            <Link to="/login">
              <div className="bg-[green] text-[white] font-bold px-5 py-2 rounded-lg">
                Login
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
