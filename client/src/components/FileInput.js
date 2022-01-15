import React from 'react';
import axios from 'axios';


const FileInput = () => {

    const handleChange = (e) =>{
        console.log(e.target.files[0]);
        const config = {
            headers: {
                authorization: "1f96165849d14483bfe837dde17c5d81",
                "content-type": "application/json",
                "transfer-encoding": "chunked"
            }
        }
        axios.post("https://api.assemblyai.com/v2/upload",e.target.files[0],config).then((data)=>console.log(data)).catch((err)=>console.log(err));
    }

    return (
        <div>
            <input type='file' onChange={(e)=>{handleChange(e)}} className='btn btn-dark'/>
        </div>
    );
};

export default FileInput;
