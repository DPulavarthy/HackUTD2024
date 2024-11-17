// Import dependencies.
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Upload.css'; 
import { PinataSDK } from "pinata";



// Export the Upload page.
export default () => {

    const [file, setFile] = useState()
    const [uploadedFileURL, setUploadedFileURL] = useState(null)

    const pinata = new PinataSDK({
        pinataJwt: "PINATA_JWT",
        pinataGateway: "example-gateway.mypinata.cloud",
    });

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    return <>
        <Navbar />
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>React File Upload</h1>
                <input type="file" onChange={handleChange} />
                <button type="submit">Upload</button>
            </form>
            {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content" />}
        </div>
    </>

}