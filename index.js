import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 2000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// random word api request
const random = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/randomword',
    headers: {
        // 'X-Api-Key': 'xtaEZGtO+SgDwH644JBxnw==CIRJ5coIvrtZEh4K'
        'X-Api-Key': `${process.env.RANDOM_WORD_API_KEY}`
    }
}

// home page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// random search
app.post("/random", async (req, res) => {
    try {
        const word = await axios.request(random);
        const search = {
            method: 'GET',
            url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
            params: {term: word.data.word},
            headers: {
                // 'X-RapidAPI-Key': '96f80518famshcdc28da43994efep1c1f51jsnad01b58e6067',
                // 'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
                'X-RapidAPI-Key': `${process.env.URBAN_DICTIONARY_API_KEY}`,
                'X-RapidAPI-Host': `${process.env.API_KEY_HOST}`
            }
        }
        const searchResponse = await axios.request(search);
        const sortedDefinitions = sortByRatio(searchResponse.data.list)
        console.log(word.data);
        console.log(searchResponse.data.list);
        console.log(sortedDefinitions);
        res.render("index.ejs", {
            word : word.data.word,
            definitions : sortedDefinitions
        });
    } catch (error) {
        console.error(error);
    }
})

// search by given word
app.post("/search", async (req, res) => {
    try {
        console.log(req.body);
        const search = {
            method: 'GET',
            url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
            params: {term: req.body.searchWord},
            headers: {
                // 'X-RapidAPI-Key': '96f80518famshcdc28da43994efep1c1f51jsnad01b58e6067',
                // 'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
                'X-RapidAPI-Key': `${process.env.URBAN_DICTIONARY_API_KEY}`,
                'X-RapidAPI-Host': `${process.env.API_KEY_HOST}`
            }
        }
        const searchResponse = await axios.request(search);
        const sortedDefinitions = sortByRatio(searchResponse.data.list)
        console.log(searchResponse.data.list);
        console.log(sortedDefinitions);
        res.render("index.ejs", {
            word : req.body.searchWord,
            definitions : sortedDefinitions
        })
    } catch (error) {
        console.error(error);
    }
})

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// function used to sort definitions by like and dislike count
function sortByRatio(definitions) {
    definitions.sort((a, b) => {
        const ratioA = a.thumbs_up / (a.thumbs_down + 1); // Adding 1 to thumbs_down to prevent division by zero
        const ratioB = b.thumbs_up / (b.thumbs_down + 1);
        return ratioB - ratioA; // Sort in descending order
    });
    return definitions;
}

