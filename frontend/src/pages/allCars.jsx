import React, { useEffect, useState } from "react";
import CarDescSmall from "../components/carDescSmall";
import useGetAllCars from "../hooks/useGetAllCars";
import { useGlobalContext } from "../context/globalContext";
import search from "../assets/search.jpg";
import { Link, useNavigate } from "react-router-dom";
const AllCars = () => {
  const { getAllCars, loading } = useGetAllCars();
  const { carsList, setCarsList, authenticatedUser } = useGlobalContext();
  const [initalCars, setInitialCars] = useState([]);

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const FetchAllCars = async () => {
    const cars = await getAllCars();
    setCarsList([...cars]);
    setInitialCars([...cars]);
  };

  useEffect(() => {
    FetchAllCars();
  }, []);

  useEffect(() => {
    if (keyword === "") return;
    else {
      const temp = [...initalCars];
      const condition = (car) => {
        return (
          car.title.includes(keyword) ||
          car.description.includes(keyword) ||
          car.tags.includes(keyword)
        );
      };
      const filteredData = temp.filter((car, idx) => {
        return condition(car);
      });
      setCarsList([...filteredData]);
    }
  }, [keyword]);

  useEffect(() => {
    if (!authenticatedUser) navigate("/login");
  }, [authenticatedUser]);

  return (
    <div className="w-screen h-screen">
      <Link to="/user/addcar">
        <div className="mt-5 cursor-pointer w-[40%] mx-auto flex justify-center">
          <button className="bg-[black] text-[white] font-bold px-5 py-2 rounded-lg">
            Add Cars
          </button>
        </div>
      </Link>
      <div className="mt-5 w-[60%] mx-auto">
        <div className="border-[black] border-[2px] px-4  w-full h-[35px] rounded-3xl flex items-center">
          <input
            type="text"
            className="border-none focus:outline-none rounded-3xl w-full h-full"
            name=""
            id=""
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <img src={search} className="w-[20px] h-[20px]" alt="" />
        </div>
      </div>
      <div className="w-[80%] mt-10  mx-auto">
        {carsList?.map((car, idx) => {
          return <CarDescSmall key={idx} car={car} />;
        })}
      </div>
    </div>
  );
};

export default AllCars;
