import React, { useEffect } from "react";
import useGetCarDetails from "../hooks/useGetCarDetails";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "../components/carousel.jsx";
import { Link } from "react-router-dom";
const CarDetails = () => {
  const { viewCarDetails, loading } = useGetCarDetails();
  const { car, setCar,authenticatedUser } = useGlobalContext();
  const { id } = useParams();

  const fetchCarDetails = async () => {
    const details = await viewCarDetails(id);
    setCar(details);
  };

  const navigate=useNavigate();

  useEffect(() => {
    fetchCarDetails();
  }, []);

  useEffect(()=>{
    if(!authenticatedUser)
    navigate("/login") 
  },[authenticatedUser])

  return (
    <div className="w-screen h-screen">
      <div className="w-[100px] mx-auto">
          <Link to="/user/car/updateCarDetails"><button className="bg-[#0b0b38] text-white px-5 py-2 rounded-lg">Edit</button></Link>
      </div>
      <div className="w-[600px] mx-auto mt-5">
        <Carousel data={car?.images || []} />
      </div>
      <div className="mt-5 w-[30%] mx-auto text-center">
        <h2 className="text-3xl">Title</h2>
        <div>{car?.title}</div>
      </div>
      <div className="mt-5 w-[50%] mx-auto text-center">
        <h2 className="text-3xl">Description</h2>
        <div>{car?.description}</div>
      </div>
      <div className="w-[70%] mx-auto mt-5">
        <h2 className="text-3xl text-center">Tags</h2>
        <div className="mt-2 flex justify-center items-center  flex-wrap gap-3">{car?.tags?.map((tag,idx)=>{
          return <div key={idx} className="bg-[chocolate] px-5 py-2 rounded-lg">{tag}</div>
        })}</div>
      </div>
    </div>
  );
};

export default CarDetails;
