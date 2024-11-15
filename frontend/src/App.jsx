import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/login'
import Signup from './pages/signup';
import {Routes,Route} from "react-router-dom"
import AddCar from "./pages/addCar"
import AllCars from "./pages/allCars"
import CarDetails from './components/carDetails';
import UpdateCarDetails from './components/updateCarDetails';
import Home from './pages/home';
import Navbar from './components/navbar';
function App() {  
 

  return (
    <> 
       <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user/addcar' element={<AddCar/>}/>
        <Route path="/user/car/getCarDetails/:id" element={<CarDetails/>}/>
        <Route path="/user/car/UpdateCarDetails" element={<UpdateCarDetails/>}/>
        <Route path="/user/allcars" element={<AllCars/>}/>
       </Routes> 
      <Toaster/>
    </>
  )
}

export default App
