import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
const useAddCar = () => {
	const [loading, setLoading] = useState(false);
	const {setAuthenticatedUser,authenticatedUser}=useGlobalContext();
 

	const addCar = async ({title,description,tags,images }) => {

		const success = handleInputErrors({title,description,tags,images });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/addCar`, {
				method: "POST",
				headers: { "Content-Type": "application/json","Authorisation":authenticatedUser?.token },
				body: JSON.stringify({title,description,tags,images}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success("Car added successfully");
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, addCar };
};
export default useAddCar;

function handleInputErrors({title,description,tags,images }) {

	if (!title||!description||!tags||!images ) {
		toast.error("Please fill in all fields");
		return false;
	}
    
	return true;
}