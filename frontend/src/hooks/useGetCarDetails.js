import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";

const useGetCarDetails = () => {
	const [loading, setLoading] = useState(false);
	const {setCar}=useGlobalContext();


	const viewCarDetails = async (id) => {

		const success = handleInputErrors(id);
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/cars/getCarDetails", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({id}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            return data.car;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, viewCarDetails };
};
export default useGetCarDetails;

function handleInputErrors(id) {

	if (!id) {
		toast.error("Something went wrong");
		return false;
	}
    
	return true;
}