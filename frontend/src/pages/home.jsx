import React, { useEffect } from "react";
import home from "../assets/home.avif";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  
  const {authenticatedUser}=useGlobalContext();
  const navigate=useNavigate()
  useEffect(()=>{
        if(!authenticatedUser)
         navigate("/login")   
  },[authenticatedUser])  
  return (
    <div className="w-screen">
      <div className="w-[75%] mx-auto h-[500px] rounded-lg relative">
        <img src={home} className="w-full h-full rounded-lg brightness-50" alt="" />
        <div className="absolute top-[30%] left-[8%]">
          <div className="text-[white] font-bold text-[45px]">Drive with Confidence</div>
          <div className="text-[white] font-bold text-[45px]">Manage with Ease</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
