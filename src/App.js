import React, { useState, useEffect } from 'react';
import './App.css';
import ImageDisplayer from './components/ImageDisplayer'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'

const baseUlr = 'https://fanvue-intervue.s3-eu-west-1.amazonaws.com/';


function App() {

    const [uploaded, setUploaded] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        UploadImage();
    }, [])


    // make a put request

    const UploadImage = () => {
        var formData = new FormData();

        formData.append('img1', img1);
        formData.append('img2', img2);
        formData.append('img3', img3);

        for (let image of formData.entries()) {

            fetch(`${baseUlr}${image[0]}`, {
                method: 'PUT',
                body: formData,
            })
            .then(res => {
                if (!res.ok) {
                    console.log('Error ', res);
                    throw Error(res.statusText);
                }
                return res.text();
            })
            .then(data => {
                setUploaded(true)
                fetchImages();
            })
            .catch(error => console.log(error)
            );
        }
    }

    // retrieve it

    const fetchImages = () => {
        fetch(`${baseUlr}`)
            .then(res => {
                if (!res.ok) {
                    console.log('Error ', res);
                    throw Error(res.statusText);
                }
                return res.text();
            })
            .then(data => {
                console.log('uploaderd file!!')
                console.log(data);
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, 'text/xml')
                console.log(xmlDoc.getElementsByTagName('ETag')[10].innerHTML)
                //Extract Image Info
            })
            .catch((error) => {
                console.log('err mes', error.message);
            })
    }

    // display it
    return (
        <div className="App">
            <ImageDisplayer />
        </div>
    );
}
export default App;
