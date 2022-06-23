import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 4000;
app.use(express.static("public"));
app.use(express.json())


// with a given country name from the client, the server then communicates with API to get the information
// after the infomation from the API is received, the server then sends the information back to the client

app.post('/countries', async (req, res)=>{
    let { countryName } = req.body;
    const countryResponse = await fetch('https://restcountries.com/v3.1/name/' + countryName +"?fullText=true");
    const data = await countryResponse.json()
    res.json(data);

})

app.post('/borders', async(req, res) =>{
    let { borderName } = req.body;
    const countryResponse = await fetch('https://restcountries.com/v3.1/alpha/'+ borderName +"?fullText=true");
    const data = await countryResponse.json()
    res.json(data);
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
})

