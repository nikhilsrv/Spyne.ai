import React from 'react'
import UploadingImage from './uploadingImage'
import { useGlobalContext } from '../context/globalContext'

const UpLoadingImagesSection = () => {
  const {uploadingImages}=useGlobalContext(); 
  return (
    <div className='w-screen'>
          <div className='w-[80%] mx-auto grid gap-5 grid-cols-5'>
               {
                 uploadingImages?.map((item,idx)=>{
                    return <UploadingImage url={item} key={idx}/>
                 })
               }
          </div>
    </div>
  )
}

export default UpLoadingImagesSection
