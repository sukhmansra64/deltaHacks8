import React, { useEffect } from 'react';
import {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Form, Row} from "react-bootstrap";
import axios from "axios";
import {setAlert} from "../actions/alert";


const TranPage = () => {
    const loop = true;
    const [counter, setCounter] =useState(0)
    const [buttonPreview, setButtonPreview] = useState("UPLOAD")
    const [transcribeButtonText, setTranscribeButtonText] = useState("TRANSCRIBE")
    const [status, setStatus] = useState("Not received, try again...")
    const [showGetStatusButton, setGetStatusButton] = useState(false)
    const [isUrl, setIsUrl] = useState(false);
    const [interval, setInterval] = useState(null);
    const [isIdReceived, setIsIdReceived] =  useState(false)
    const [file,setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [ID, setID] = useState('');
    const [info, setInfo] = useState(null);
    const [errors, setErrors] = useState(null);
    let count = 0;
    let count2=0;
    const onChange = (e) =>{
        setButtonPreview(e.target.files[0].name)
        setFile(e.target.files[0]);
    }
    const postRequest = () => {
        setIsUrl(false);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        };
        fetch('/api/transcriptions', requestOptions)
            .then(response => response.json())
            .then(data =>  {
                console.log(data.id);
                setID(data.id)
                setIsIdReceived(true)
                } );
    }
    const getStatusForTranscription = () => {
        
        setIsIdReceived(false)
        setGetStatusButton(true)
                
              
        fetch(`/api/transcriptions/${ID}`)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            
            setInfo(data);
            setStatus(data.status)
            console.log(data.status) // "qued" or "processing" or "completed"
            if(data.status=='completed'){
                console.log(data.chapters);
                // setIsIdReceived(false)
            }

        })
        .catch(error => {
            setIsIdReceived(false)
            setErrors(error);
            console.error(error);
        });

        
    }


    const onClick =async (e) =>{
        if(file === null){
            console.log("Add a file");
        }
        setTranscribeButtonText("Transcribing...")
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
                setIsUrl(true);
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

    const getPopulatedChapterSummary = () => {

        if (showGetStatusButton && status =="completed" && !info){
            if (info.chapters){
                let chapters = info.chapters
                chapters.map((item)=>{
                    return (
                        <div>
                            <li>
                                <h3 className='chapter-title'>{item.gist}</h3>
                                <a className='chapter-timestamps'>{item.start}</a>
                                <br/>
                                    <p className='chapter-description'>{item.summary}</p>
                            </li>
                        </div>


                    )
                })
            } else{
                return null
            }
            
        } else{
            return null
        }

    }

    const getTimeStamp = (millis) =>{
        let rv = null

        if (millis < 60000){
            console.log("first")
            let seconds = Math.floor(millis/1000)
            if(seconds < 10){
                seconds = "0"+seconds
            }

            rv=  "00:" + seconds
        } else if (millis < 3600000){
            console.log("second")
            let mins = Math.floor(millis / 60000)
            if(mins < 10){
                mins = "0" + mins
            }
            let seconds = Math.floor((millis - (mins * 60000) ) / 1000)
            if(seconds < 10){
                seconds = "0"+seconds
            }
            rv =  mins + ":" + seconds
        } else{
            console.log("third")
            let hours = Math.floor(millis / 3600000)
            if(hours < 10){
                hours = "0"+hours
            }
            let mins = Math.floor(( millis - (hours * 3600000) ) / 60000)
            if(mins < 10){
                mins = "0"+mins
            }
            let seconds = Math.floor((millis - (hours * 3600000) - (mins * 60000))/1000)
            if(seconds < 10){
                seconds = "0"+seconds
            }
            rv = hours + ":" + mins + ":" + seconds
        }
        console.log(millis + ", " + rv)
        return rv
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       console.log('This will run every second!');
    //     }, 1000);
    //     setCounter(counter+1)
    //     return () => clearInterval(interval);
    //   }, [counter]);

    return (
        <div className='main'>
            {/* {list = getPopulatedChapterSummary()} */}

            {isUrl&&postRequest()}

            

            {isIdReceived&&getStatusForTranscription()}
            
            <div style={{paddingLeft:"1vw"}}>
                <div className='two-content-1'>
                    <h1>Upload file</h1>
                    <p>accepted types are .mp3 and .mp4</p>
                    <form onChange={(e)=>onChange(e)}>
                        <label className='custom-file-upload'>
                            <input type='file' className='file-upload'/>
                                <a className='rounded-button'>{buttonPreview}</a>
                        </label>
                        <br/>
                        {showGetStatusButton == false && <btn  className='rounded-button' onClick={(e)=>{onClick(e)}}>{transcribeButtonText}</btn>}
                        <br/>
                        {/* <Row> */}
                        <div>
                            {showGetStatusButton &&  <btn  className='rounded-button' onClick={(e)=>{getStatusForTranscription(e)}}>Check Status</btn> }
                            {showGetStatusButton && <p className='chapter-description'>{status}</p>} 
                        </div>
                        {/* </Row> */}
                    </form>
                </div>
            </div>

            <div className="two-content-2">
                <ul>
                        { (showGetStatusButton&&status=="completed") ? info.chapters.map( (chapter, index) => {
                            return(
                                <li key={index}>
                                    <h3 className='chapter-title'>{index+1 +".) " + chapter.gist}</h3>
                                    <a className='chapter-timestamps'>{"start time: " + getTimeStamp(chapter.start) }</a>
                                    <br/>
                                        <p className='chapter-description' style={{marginLeft:"0"}}>{chapter.headline}</p>
                                    <br/>
                                </li>
                            )
                        } ): null }
                    
                    {/* <li>
                        <h3 className='chapter-title'>SAMPLE TITLE</h3>
                        <a className='chapter-timestamps'>start time</a>
                        <br/>
                            <p className='chapter-description'>description</p>
                    </li>
                    <li>
                        <h3 className='chapter-title'>SAMPLE TITLE</h3>
                        <a className='chapter-timestamps'>start time</a>
                        <br/>
                            <p className='chapter-description'>description</p>
                    </li>
                    <li>
                        <h3 className='chapter-title'>SAMPLE TITLE</h3>
                        <a className='chapter-timestamps'>start time</a>
                        <br/>
                            <p className='chapter-description'>description</p>
                    </li>
                    <li>
                        <h3 className='chapter-title'>SAMPLE TITLE</h3>
                        <a className='chapter-timestamps'>start time</a>
                        <br/>
                            <p className='chapter-description'>description</p>
                    </li> */}

                </ul>
            </div>
        </div>
    );
};


export default TranPage;
