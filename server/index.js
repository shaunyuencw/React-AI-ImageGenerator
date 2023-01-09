const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const opoenai = new OpenAIApi(configuration);

// Add body parser and cors to express
const app  = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(cors({ origin: "*" }))

const port = 3080

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    console.log('Received GET');
    res.send('Hello World!');
})

app.post('/generateImages', async (req, res) => {
    const { prompt, n, size } = req.body;
    console.log("prompt", prompt);
    console.log("n", n);
    console.log("size", size);

    const response = await opoenai.createImage({
        prompt: `${prompt}`,
        n: parseInt(n),
        size: `${size}`,
    })

    res.json({
        message: response.data
    })

    console.log("Response", response.data);
})