import React from "react";
import reactImg from "../assets/react.svg";
import { Link } from "react-router-dom";
import useDeleteCar from "../hooks/useDeleteCar.js";
const carDescSmall = ({ car }) => {
  const { deleteCar, loading } = useDeleteCar();

  const handleDelete = () => {
    deleteCar(car?._id);
    window.location.reload(false);
  };
  return (
    <div className="w-full mt-4 px-5 flex  justify-evenly border-[2px] border-[black] rounded-lg items-center">
      <div className="w-24 h-24">
        <img className="w-full h-full" src={car?.images[0]} alt="" />
      </div>
      <div className="w-[60%]">
        <div>{car?.title || ""}</div>
        <div>{car?.description || ""}</div>
        <div className="flex flex-wrap gap-3">
          {car?.tags.map((tag, idx) => {
            return (
              <div
                className="bg-[chocolate] text-[white] px-4 py-2 font-bold"
                key={idx}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        {loading ? (
          <div className="mt-8 cursor-pointer">
            <button className="bg-[#63f163] text-[white] px-10 font-bold py-2 rounded-3xl">
              <span className="spinner font-bold"></span>
            </button>
          </div>
        ) : (
          <div className="flex gap-x-2">
            <Link to={`/user/car/getCarDetails/${car._id}`}>
              <div className=" cursor-pointer bg-[green] text-[white] font-bold px-5 py-2 rounded-lg">
                View
              </div>
            </Link>
            <div
              onClick={handleDelete}
              className="bg-[red] cursor-pointer  text-[white] font-bold px-5 py-2 rounded-lg"
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default carDescSmall;
