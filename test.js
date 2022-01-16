const axios = require("axios"); 
const fs = require("fs");

// Function not needed anymore
 function createNewLink () {

    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "b8ad47acb37a4ce5a5e83ba908c75b15",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
        },
        'maxContentLength': Infinity,
        'maxBodyLength': Infinity
    });

    const file = "./lecture_recording.mp4";

    let data = fs.readFileSync(file);

    let res = assembly.post("/upload", data)

    return res

}


function getTranscription (URL) {

    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "b8ad47acb37a4ce5a5e83ba908c75b15",
            "content-type": "application/json",
        },
    });

    let response = assembly
        .post("/transcript", {
            audio_url: URL,
            sentiment_analysis: true,
            auto_chapters: true
        })

    return response

}

function getResponse(id){

    const transcript_id = id

    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "b8ad47acb37a4ce5a5e83ba908c75b15",
            "content-type": "application/json",
        },
    });

    let res = assembly.get( `/transcript/${transcript_id}` )
    
    return res

}

async function helperFunction(id) {
    let result = await getResponse(id)

    console.log("Status received: " + result.status)
    console.log("")
    return result.data
}

async function postingHelperFunction(url) {
    // Video is dynamically linked through front end so no need for this code:
    // let link = await createNewLink()
    // let actual_link =  link.data.upload_url

    // console.log("finished creating new link: " + actual_link)

    // let response = await getTranscription(actual_link)

    let response = await getTranscription(url)
    console.log("received transcription ID: " + response.data.id)
    console.log("")

    return response.data

}

module.exports = {helperFunction, postingHelperFunction}