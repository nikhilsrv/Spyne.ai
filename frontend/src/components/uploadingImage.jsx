import React from 'react'

const UploadingImage = ({url}) => {
  return (
    <div>
        <div className='w-[150px] h-[150px]'>
            <img src={url} className='w-full h-full' alt="" />
        </div>
    </div>
  )
}

export default UploadingImage
