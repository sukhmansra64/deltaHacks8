import React from 'react';
import {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {setAlert} from "../actions/alert";


const TranPage = () => {
    const loop = true;
    const [file,setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [ID, setID] = useState('');
    const [info, setInfo] = useState(null);
    const [errors, setErrors] = useState(null);
    let count = 0;
    let count2=0;
    const onChange = (e) =>{
        setFile(e.target.files[0]);
    }
    const postRequest = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        };
        fetch('http://localhost:8000/api/transcriptions', requestOptions)
            .then(response => response.json())
            .then(data =>  {
                console.log(data.id);
                setID(data.id)} );
    }
    const getStatusForTranscription = () => {
        fetch(`http://localhost:8000/api/transcriptions/${ID}`)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                setInfo(data);
                console.log(data.status) // "qued" or "processing" or "completed"
                if(data.status=='completed'){
                    console.log(data.chapters);
                }

            })
            .catch(error => {
                setErrors(error);
                console.error(error);
            });
    }

    const onClick =async (e) =>{
        if(file === null){
            console.log("Add a file");
        }
        const config = {
            headers: {
                authorization: "b8ad47acb37a4ce5a5e83ba908c75b15",
                "content-type": "application/json",
                "transfer-encoding": "chunked"
            }
        }
        try{
            axios.post("https://api.assemblyai.com/v2/upload",file,config).then((res)=>{
                console.log(res.data.upload_url);
                setUrl(res.data.upload_url);
            });
        }catch(err){
            console.error(err.message)
        }
    }

    const onClick2=(e)=>{
        e.preventDefault();
        getStatusForTranscription();
    }
    const onClick3 = (e) =>{
        e.preventDefault();
        postRequest();
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
                    <br/>
                    {url!='' &&
                    <Button onClick={(e)=>onClick3(e)}>get ID</Button>
                    }
                    <br/>
                    {ID!=''&&
                        <Button onClick={(e)=>onClick2(e)}>get Transcription</Button>
                    }
                </Form>
            </div>
        </div>
    );
};


export default TranPage;
