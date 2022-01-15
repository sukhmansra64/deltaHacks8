import React from 'react';

const FileInput = () => {

    const handleChange = (e) =>{
        console.log(e);
    }

    return (
        <div>
            <input type='file' onChange={(e)=>{handleChange(e)}} className='btn btn-dark'/>
        </div>
    );
};

export default FileInput;
