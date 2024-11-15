import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../context/globalContext.jsx";
import UpLoadingImagesSection from "../components/upLoadingImagesSection.jsx";
import useAddCar from "../hooks/useAddCars.js";
import toast from "react-hot-toast";
const AddCar = () => {
  const [files, setFiles] = useState([]);
  const { addCar, loading } = useAddCar();
  const { setUploadingImages, uploadingImages,authenticatedUser } = useGlobalContext();
  const [uploadLoading, setUploadLooading] = useState(false);
  

  const navigate=useNavigate();
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      setUploadLooading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars/uploadImages`, {
        headers:{"Authorisation":authenticatedUser?.token},
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setUploadingImages(data?.urls);
      if (data.error) {
        throw new Error(data.error);
      }

      e.target.value=null;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadLooading(false);
    }
  };

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    tags: [],
    images: [],
  });

  const [inputTags, setInputTags] = useState([]);

  const handleTagFormChange = (index, e) => {
    let data = [...inputTags];
    data[index] = e.target.value;
    setInputTags(data);
  };
  const addTags = (e) => {
    e.preventDefault();
    let newfield = "";
    setInputTags([...inputTags, newfield]);
  };

  const removeTags = (e, index) => {
    e.preventDefault();
    let data = [...inputTags];
    data.splice(index, 1);
    setInputTags(data);
  };

  useEffect(() => {
    setUserInput({ ...userInput, tags: inputTags });
  }, [inputTags]);

  useEffect(() => {
    setUserInput({ ...userInput, images: uploadingImages });
  }, [uploadingImages]);
  
  useEffect(()=>{
    if(!authenticatedUser)
    navigate("/login");
  },[authenticatedUser]);
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    await addCar(userInput);
    navigate("/user/allcars")
  };
  useEffect(()=>{
    setUploadingImages([]);
  },[])
  return (
    <div className="w-screen h-screen flex  justify-center items-center">
      <div className="w-[80%]">
        <form action="" className="w-full">
          <div>
            <input
              type="text"
              className="w-full h-6 pl-2 rounded-md border-[2px] border-[black]"
              placeholder="Title"
              onChange={(e) =>
                setUserInput({ ...userInput, title: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <textarea
              name=""
              className="w-full pl-2  h-40 rounded-md border-[2px] border-[black]"
              id=""
              placeholder="Description"
              onChange={(e) =>
                setUserInput({ ...userInput, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mt-8">
            <div className="flex gap-x-5">
              <h1>Add Tags (minimum 1)</h1>
              <div
                className="w-[30px] h-[30px] bg-[green] flex justify-center items-center"
                onClick={(e) => addTags(e)}
              >
                <button className="text-[white] font-bold flex justify-center items-center text-[20px] pb-1">
                  +
                </button>
              </div>
            </div>

            <div className="mt-5 flex gap-3 flex-wrap">
              {inputTags.map((input, index) => {
                return (
                  <div className="flex gap-x-1" key={index}>
                    <input
                      name="tag"
                      placeholder="Tag"
                      className="w-20 pl-2 border-[black] border-[2px] rounded-lg"
                      value={input}
                      onChange={(e) => handleTagFormChange(index, e)}
                    />
                    <div
                      className="w-[30px] h-[30px] flex justify-center items-center bg-[red] "
                      onClick={(e) => removeTags(e, index)}
                    >
                      <button className="text-[15px] text-[white] ">X</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
        <div className="mt-5">
          <div>Add images (minimum 1 ,maximum 10)</div>
          <form
            className="mt-5"
            onSubmit={(e) => handleUpload(e)}
            encType="multipart/form-data"
          >
            <input
              type="file"
              multiple={true}
              onChange={(e) => setFiles(e.target.files)}
              accept="images/*"
            />
            {uploadLoading ? (
              <div className="inline mt-8 cursor-pointer">
                <button className="bg-[black] text-[white] px-10 font-bold py-1 rounded-3xl">
                  <span className="spinner font-bold"></span>
                </button>
              </div>
            ) : (
              <input
                type="submit"
                className="bg-[black] cursor-pointer text-[white] px-5 py-2 rounded-3xl"
                value="Upload"
              ></input>
            )}
          </form>
        </div>
        <UpLoadingImagesSection/>
        <div className="mt-5">
          {loading ? (
            <div className="mt-8 cursor-pointer">
              <button className="bg-[black] text-[white] px-10 font-bold py-1 rounded-3xl">
                <span className="spinner font-bold"></span>
              </button>
            </div>
          ) : (
            <div className="cursor-pointer" onClick={(e) => handleSubmit(e)}>
              <button className="bg-[black] text-[white] px-10 py-2 font-bold rounded-3xl ">Add Car</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCar;
