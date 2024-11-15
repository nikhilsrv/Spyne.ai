import { useState } from "react";
import toast from "react-hot-toast";
const useGetAllCars = () => {
	const [loading, setLoading] = useState(false);
	const getAllCars = async () => {

		setLoading(true);
		try {
			
			const res = await fetch("/api/cars/getAllCars");
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			return data.cars;
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, getAllCars };
};
export default useGetAllCars;
