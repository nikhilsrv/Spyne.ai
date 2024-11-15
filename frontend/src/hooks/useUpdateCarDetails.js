import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
const useUpdateCarDetails = () => {

	const [loading, setLoading] = useState(false);
    const {car,authenticatedUser}=useGlobalContext()
	
	const updateCarDetails = async ({title,description,tags,images }) => {

		const success = handleInputErrors({title,description,tags,images });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/updateCarDetails`, {
				method: "PUT",
				headers: { "Content-Type": "application/json","Authorisation":authenticatedUser?.token },
				body: JSON.stringify({id:car?._id,title,description,tags,images}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success("Car updated successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, updateCarDetails };
};
export default useUpdateCarDetails;

function handleInputErrors({title,description,tags,images }) {

	if (!title||!description||!tags||!images ) {
		toast.error("Please fill in all fields");
		return false;
	}
    
	return true;
}