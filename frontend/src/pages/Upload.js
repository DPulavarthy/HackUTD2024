// // Import dependencies.
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import '../styles/Upload.css';
// import { upload } from '../utils/config.js';



// // Export the Upload page.
// export default () => {

//     const [powerFile, setPowerFile] = useState();
//     const [waterFile, setWaterFile] = useState();
//     const [floorFile, setFloorFile] = useState();
//     const [carbonFile, setCarbonFile] = useState();
//     const [wasteFile, setWasteFile] = useState();

//     const powerHandler = (event) => {
//         setPowerFile(event.target.files[0]);
//     }

//     const waterHandler = (event) => {
//         setWaterFile(event.target.files[0]);
//     }

//     const floorHandler = (event) => {
//         setFloorFile(event.target.files[0]);
//     }

//     const carbonHandler = (event) => {
//         setCarbonFile(event.target.files[0]);
//     }

//     const wasteHandler = (event) => {
//         setWasteFile(event.target.files[0]);
//     }

//     window.onload = () => {

//         document.querySelector('#power #file').addEventListener('change', (event) => {
//             const file = event.target.files[0];
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 document.querySelector('#power #cache').textContent = e.target.result;
//             };
//             reader.readAsText(file);
//         });

//         document.querySelector('#water #file').addEventListener('change', (event) => {
//             const file = event.target.files[0];
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 document.querySelector('#water #cache').textContent = e.target.result;
//             };
//             reader.readAsText(file);
//         });

//         document.querySelector('#floor #file').addEventListener('change', (event) => {
//             const file = event.target.files[0];
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 document.querySelector('#floor #cache').textContent = e.target.result;
//             };
//             reader.readAsText(file);
//         });

//         document.querySelector('#carbon #file').addEventListener('change', (event) => {
//             const file = event.target.files[0];
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 document.querySelector('#carbon #cache').textContent = e.target.result;
//             };
//             reader.readAsText(file);
//         });

//         document.querySelector('#waste #file').addEventListener('change', (event) => {
//             const file = event.target.files[0];
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 document.querySelector('#waste #cache').textContent = e.target.result;
//             };
//             reader.readAsText(file);
//         });

//     }

//     const powerSubmit = async () => {
//         try {
//             upload(document.querySelector('#power #cache').textContent, powerFile.name, powerFile.type);
//             localStorage.setItem('powerFile', document.querySelector('#power #cache').textContent);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const waterSubmit = async () => {
//         try {
//             upload(document.querySelector('#water #cache').textContent, waterFile.name, waterFile.type);
//             localStorage.setItem('waterFile', document.querySelector('#water #cache').textContent);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const floorSubmit = async () => {
//         try {
            
//             upload(document.querySelector('#floor #cache').textContent, floorFile.name, floorFile.type);
//             localStorage.setItem('floorFile', document.querySelector('#floor #cache').textContent);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const masterSubmit = async () => {
//         try {

//             upload(document.querySelector('#power #cache').textContent, powerFile.name, powerFile.type);


//             upload(document.querySelector('#water #cache').textContent, waterFile.name, waterFile.type);
//             // localStorage.setItem('waterFile', document.querySelector('#water #cache').textContent);

//             upload(document.querySelector('#carbon #cache').textContent, carbonFile.name, carbonFile.type);
//             // localStorage.setItem('carbonFile', document.querySelector('#carbon #cache').textContent);

//             upload(document.querySelector('#floor #cache').textContent, floorFile.name, floorFile.type);
//             // localStorage.setItem('floorFile', document.querySelector('#floor #cache').textContent);

//             upload(document.querySelector('#waste #cache').textContent, wasteFile.name, wasteFile.type);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const carbonSubmit = async () => {
//         try {
//             upload(document.querySelector('#carbon #cache').textContent, carbonFile.name, carbonFile.type);
//             localStorage.setItem('carbonFile', document.querySelector('#carbon #cache').textContent);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const wasteSubmit = async () => {
//         try {
//             upload(document.querySelector('#waste #cache').textContent, wasteFile.name, wasteFile.type);
//             localStorage.setItem('wasteFile', document.querySelector('#waste #cache').textContent);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     function toggleCheckbox() {
//         const fileInput = document.getElementById('file');
//         const checkbox = document.getElementById('uploaded');
//         if (fileInput.files.length > 0) {
//             checkbox.checked = true; 
//         } else {
//             checkbox.checked = false; 
//         }
//     }

    

//     return <>
//         <Navbar />

//         {/* <div class="container">
//             <h1 class="file-header">Power File</h1>
//             <label for="file" class="file-input-label">Choose File</label>
//             <input type="file" class="file-input" id="file" onChange={toggleCheckbox} />
//             <label for="uploaded" class="file-upload-checkbox-label">
//                 <input type="checkbox" id="uploaded" class="file-upload-checkbox" disabled />
//             </label>
//         </div> */}
        
//         <div class="upload-container">

//             <div class="testing-container">
//                 <div id="power" className="upload-section-container">
//                     <div id="cache" style={{ display: 'none' }}></div>
//                     <label className="form-label">Power File</label>
//                     <input type="file" id="file" onChange={powerHandler} className="file-input" />
//                     {/* <button onClick={powerSubmit} className="submit-btn">Submit</button> */}
//                 </div>

//                 <div id='water' className="upload-section-container">
//                     <div id="cache" style={{ display: 'none' }}></div>
//                     <label className="form-label">Water File</label>
//                     <input type="file" id="file" onChange={waterHandler} className="file-input" />
//                     {/* <button onClick={waterSubmit} className="submit-btn">Submit</button> */}
//                 </div>
//                 <div id='floor' className="upload-section-container">
//                     <div id="cache" style={{ display: 'none' }}></div>
//                     <label className="form-label">Floor File</label>
//                     <input type="file" id="file" onChange={floorHandler} className="file-input" />
//                     {/* <button onClick={floorSubmit} className="submit-btn">Submit</button> */}
//                 </div>
//                 <div id='carbon' className="upload-section-container">
//                     <div id="cache" style={{ display: 'none' }}></div>
//                     <label className="form-label">Carbon File</label>
//                     <input type="file" id="file" onChange={carbonHandler} className="file-input" />
//                     {/* <button onClick={carbonSubmit} className="submit-btn">Submit</button> */}
//                 </div>
//                 <div id='waste' className="upload-section-container">
//                     <div id="cache" style={{ display: 'none' }}></div>
//                     <label className="form-label">Waste File</label>
//                     <input type="file" id="file" onChange={wasteHandler} className="file-input" />
//                 </div>
//             </div>
//             <label for="additional-input" class="styled-label">Additional Information</label>
//         <input type="text" id="additional-input" class="styled-input" placeholder="Additional Information" />
//         <button onClick={masterSubmit} className="submit-btn">Submit</button>
//         </div>

//     </>

// }

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Upload.css';
import { upload } from '../utils/config.js';

export default () => {

    const [powerFile, setPowerFile] = useState(null);
    const [waterFile, setWaterFile] = useState(null);
    const [floorFile, setFloorFile] = useState(null);
    const [carbonFile, setCarbonFile] = useState(null);
    const [wasteFile, setWasteFile] = useState(null);

    // File handlers
    const powerHandler = (event) => setPowerFile(event.target.files[0]);
    const waterHandler = (event) => setWaterFile(event.target.files[0]);
    const floorHandler = (event) => setFloorFile(event.target.files[0]);
    const carbonHandler = (event) => setCarbonFile(event.target.files[0]);
    const wasteHandler = (event) => setWasteFile(event.target.files[0]);

    // Read and upload files
    const uploadFile = (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };

    // const masterSubmit = async () => {
    //     try {
    //         const powerContent = powerFile ? await uploadFile(powerFile) : null;
    //         const waterContent = waterFile ? await uploadFile(waterFile) : null;
    //         const floorContent = floorFile ? await uploadFile(floorFile) : null;
    //         const carbonContent = carbonFile ? await uploadFile(carbonFile) : null;
    //         const wasteContent = wasteFile ? await uploadFile(wasteFile) : null;

    //         if (powerContent) upload(powerContent, powerFile.name, powerFile.type);
    //         if (waterContent) upload(waterContent, waterFile.name, waterFile.type);
    //         if (floorContent) upload(floorContent, floorFile.name, floorFile.type);
    //         if (carbonContent) upload(carbonContent, carbonFile.name, carbonFile.type);
    //         if (wasteContent) upload(wasteContent, wasteFile.name, wasteFile.type);

    //     } catch (error) {
    //         console.log('Error during file upload:', error);
    //     }
    // };

    const masterSubmit = async () => {
        try {
            // Log the file names before uploading
            console.log('Uploading the following files:');
            
            if (powerFile) {
                console.log(`Power File: ${powerFile.name}`);
                upload(powerFile ? await uploadFile(powerFile) : null, powerFile.name, powerFile.type);
            }
            
            if (waterFile) {
                console.log(`Water File: ${waterFile.name}`);
                upload(waterFile ? await uploadFile(waterFile) : null, waterFile.name, waterFile.type);
            }
            
            if (carbonFile) {
                console.log(`Carbon File: ${carbonFile.name}`);
                upload(carbonFile ? await uploadFile(carbonFile) : null, carbonFile.name, carbonFile.type);
            }
            
            if (floorFile) {
                console.log(`Floor File: ${floorFile.name}`);
                upload(floorFile ? await uploadFile(floorFile) : null, floorFile.name, floorFile.type);
            }
            
            if (wasteFile) {
                console.log(`Waste File: ${wasteFile.name}`);
                upload(wasteFile ? await uploadFile(wasteFile) : null, wasteFile.name, wasteFile.type);
            }
    
            // Additional information can also be logged
            const additionalInfo = document.querySelector('#additional-input').value;
            console.log(`Additional Information: ${additionalInfo}`);
    
        } catch (error) {
            console.log('Error during submission:', error);
        }
    }
    
    return (
        <>
            <Navbar />

            <div className="upload-container">
                <div className="testing-container">
                    <div id="power" className="upload-section-container">
                        <label className="form-label">Power File</label>
                        <input type="file" id="file" onChange={powerHandler} className="file-input" />
                    </div>

                    <div id='water' className="upload-section-container">
                        <label className="form-label">Water File</label>
                        <input type="file" id="file" onChange={waterHandler} className="file-input" />
                    </div>

                    <div id='floor' className="upload-section-container">
                        <label className="form-label">Floor File</label>
                        <input type="file" id="file" onChange={floorHandler} className="file-input" />
                    </div>

                    <div id='carbon' className="upload-section-container">
                        <label className="form-label">Carbon File</label>
                        <input type="file" id="file" onChange={carbonHandler} className="file-input" />
                    </div>

                    <div id='waste' className="upload-section-container">
                        <label className="form-label">Waste File</label>
                        <input type="file" id="file" onChange={wasteHandler} className="file-input" />
                    </div>
                </div>
                <label htmlFor="additional-input" className="styled-label">Additional Information</label>
                <input type="text" id="additional-input" className="styled-input" placeholder="Additional Information" />
                <button onClick={masterSubmit} className="submit-btn">Submit</button>
            </div>
        </>
    );
}
