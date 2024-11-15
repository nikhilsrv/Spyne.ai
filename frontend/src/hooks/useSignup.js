import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/globalContext";
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const {setAuthenticatedUser}=useGlobalContext();


	const signup = async ({ fullName,emailId,password,confirmPassword }) => {

		const success = handleInputErrors({ fullName, emailId ,password, confirmPassword});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/user/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({fullName,emailId, password, confirmPassword,}),
			});

			const data = await res.json();
            
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("car-user", JSON.stringify(data));
			setAuthenticatedUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, emailId, password, confirmPassword, }) {

	if (!fullName || !emailId || !password || !confirmPassword ) {
		toast.error("Please fill in all fields");
		return false;
	}
    
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 

    if (!emailId.match(validRegex)) {  
      toast.error("Emailid is not valid")
      return;
    }

	if (password !== confirmPassword) { 
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}