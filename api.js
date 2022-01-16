const express = require('express');
const app = express()

const apifunctions = require('./test.js');
const cors = require('cors')
const path = require('path');

app.use(cors());

app.use(express.json())

app.get('/api/transcriptions/:id', async (req, res) => {
    console.log("GET REQUEST")
    let result = await apifunctions.helperFunction(req.params.id)
    res.send(result);

});

app.use(express.static('client/build'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client,build,index.html'))
});

app.post('/api/transcriptions', async (req, res) => {
    console.log("POST REQUEST")
    let url = req.body.url
    const result = await apifunctions.postingHelperFunction(url)
    res.send(result)
})


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listing on port ${port}...`));