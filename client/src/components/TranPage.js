import React from 'react';
import {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

const TranPage = () => {
    const [file,setFile] = useState(null);
    const [url, setUrl] = useState('');
    const onChange = (e) =>{
        setFile(e.target.files[0]);
    }
    const onClick =async (e) =>{
        if(file === null){
            console.log("Add a file");
        }
        const config = {
            headers: {
                authorization: "1f96165849d14483bfe837dde17c5d81",
                "content-type": "application/json",
                "transfer-encoding": "chunked"
            }
        }
        try{
            const res = await  axios.post("https://api.assemblyai.com/v2/upload",file,config);
            setUrl(res.data.upload_url);
        }catch(err){
            console.error(err.message)
        }
    }
    return (
        <div>
            <div className="Login">
                <Form>
                    <Form.Group size="lg" controlId="file" onChange={(e)=>onChange(e)}>
                        <Form.Label>Select a .mp3 or .mp4 file to transcribe</Form.Label>
                        <Form.Control
                            autoFocus
                            type="file"
                        />
                    </Form.Group>
                    <br/>
                    <Button block size="lg" className='btn-dark' onClick={(e)=>onClick(e)}>
                        Transcribe
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default TranPage;
