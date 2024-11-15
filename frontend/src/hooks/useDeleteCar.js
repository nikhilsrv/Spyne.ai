import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
const useDeleteCar = () => {
	const [loading, setLoading] = useState(false);
	const deleteCar = async (id) => {
        alert("Are you sure you want to delete the car");

		setLoading(true);
		try {
			const res = await fetch("/api/cars/deleteCar", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({id}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success("Car deleted successfully");
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, deleteCar };
};
export default useDeleteCar;
