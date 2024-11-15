import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
const useGetAllCars = () => {
	const [loading, setLoading] = useState(false);
	const {authenticatedUser}=useGlobalContext();
	
	const getAllCars = async () => {

		setLoading(true);
		try {
			
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/getAllCars`,{headers:{"Authorisation":authenticatedUser?.token}});
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
