import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const {setAuthenticatedUser}=useGlobalContext();


	const login = async ({emailId,password }) => {

		const success = handleInputErrors({emailId ,password,});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({emailId, password,}),
			});

			const data = await res.json();
        
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("car-user", JSON.stringify(data));
			console.log(data)
			setAuthenticatedUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useSignup;

function handleInputErrors({emailId, password}) {

	if (!emailId || !password ) {
		toast.error("Please fill in all fields");
		return false;
	}
    
	return true;
}