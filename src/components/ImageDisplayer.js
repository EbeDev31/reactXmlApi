import React from 'react'
import img1 from '../images/img1.png'
import img2 from '../images/img2.png'
import img3 from '../images/img2.png'
const ImageDisplayer = ({images = [img1,img2,img3]}) => {
    return (
        <div>
            {
                images.map((img,index)=>{
                   return <img key={index}
                   src={img}
                   alt="image" />

                })
            }
        </div>
    )
}

export default ImageDisplayer
