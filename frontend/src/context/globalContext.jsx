import { createContext, useContext, useState } from "react";
export const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalContextProvider = ({ children }) => {

  const [authenticatedUser, setAuthenticatedUser] = useState(
    JSON.parse(localStorage.getItem("car-user")) || null
  );

  const [uploadingImages,setUploadingImages]=useState([]);
  const [carsList,setCarsList]=useState([]);
  const [car,setCar]=useState(null);

  return (
    <GlobalContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        uploadingImages,
        setUploadingImages,
        carsList,
        setCarsList,
        car,
        setCar
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
