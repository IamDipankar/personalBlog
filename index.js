import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, format, join } from 'path';
import path from 'path';
import fs, { truncate } from 'fs';
import bodyParser from 'body-parser';
const __dirname = dirname(fileURLToPath(import.meta.url)); // Get the directory of the current module


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

function sendHome(res){
    const ids = [];
    const blogs = [];

    const indexData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'index.json'), 'utf-8'));
    indexData.keys.forEach((state, index) => {
        if (state) ids.push(index);
    });

    ids.reverse();

    ids.forEach((id) => {
        const filePath = path.join(__dirname, 'data', 'blogs', `${id}.json`);
        const fileData = fs.readFileSync(filePath, 'utf-8');
        try {
            blogs.push(JSON.parse(fileData));
        } catch (err) {
            console.error(`Error parsing JSON for blog ID ${id}:`, err.message);
        }
    });

    console.log("render called");

    res.render('index.ejs', { blogs, ids });
}

app.get('/', (req, res) => {
    sendHome(res);
});

app.get('/form', (req, res) => {
    res.render("form.ejs");
});

app.post('/create', (req, res) => {
    let date = new Date();
    let title = req.body.title;
    let body = req.body.body;
    let ID = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "index.json"))).lastKey + 1;


    let json = {
        "ID" : ID,
        "time" : date.toISOString(),
        "title" : title,
        "body" : body,
        "type" : "",
        "keywords" : [],
        "editHistory" : [
            {
                "timeStamp" : date.toISOString(),
                "final" : true
            }
        ]
    };
    

    const jsonString = JSON.stringify(json, null, 2); // Pretty print with 2 spaces

    // Save JSON string to a file
    const filePath = `./data/blogs/${ID}.json`; // File path to save the JSON
    try {
        fs.writeFileSync(filePath, jsonString);
        console.log('JSON file has been saved successfully!');
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }

    let indexJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "index.json")));
    indexJSON.lastKey = ID;
    indexJSON.keys.push(true);
    const jsonString2 = JSON.stringify(indexJSON, null, 2); // Pretty print with 2 spaces
    // Save JSON string to a file
    const filePath2 = `./data/index.json`; // File path to save the JSON
    try {
        fs.writeFileSync(filePath2, jsonString2);
        console.log('JSON index file has been saved successfully!');
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }
    
    sendHome(res);
});

app.get("/blog", (req, res) => {
    let ID = req.query.ID;
    const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "blogs", `${ID}.json`)));
    res.render('blog.ejs', {blogData});
});

app.post("/delete", (req, res) => {
    let id = req.body.id;
    let indexJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "index.json")));
    indexJSON.keys[id] = false;
    const jsonString2 = JSON.stringify(indexJSON, null, 2); // Pretty print with 2 spaces
    // Save JSON string to a file
    const filePath2 = `./data/index.json`; // File path to save the JSON
    console.log(1);
    try {
        fs.writeFileSync(filePath2, jsonString2);
        console.log('JSON index file has been saved successfully!');
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }

    // update blog Data
    const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "blogs", `${id}.json`)));
    let date = new Date();
    blogData.deleted = date.toISOString();
    const jsonString3 = JSON.stringify(blogData, null, 2); // Pretty print with 2 spaces
    // Save JSON string to a file
    const filePath3 = path.join(__dirname, "data", "blogs", `${id}.json`); // File path to save the JSON
    console.log(1);
    try {
        fs.writeFileSync(filePath3, jsonString3);
        console.log('JSON file has been saved successfully!');
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }
    
    sendHome(res);

});

app.post("/edit", (req, res) => {
    let id = req.body.id;
    const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "blogs", `${id}.json`)));
    res.render('update.ejs', {blogData});
});

app.post("/update", (req, res) => {
    let id = req.body.id;
    const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "blogs", `${id}.json`)));
    blogData.editHistory.slice(-1)[0].final = false;
    blogData.editHistory.slice(-1)[0].title = blogData.title;
    blogData.editHistory.slice(-1)[0].body = blogData.body;

    blogData.title = req.body.title;
    blogData.body = req.body.body;

    let time = new Date().toISOString();
    blogData.editHistory.push({
        timeStamp : time,
        final : true
});

    // write to json
    const jsonString = JSON.stringify(blogData, null, 2); // Pretty print with 2 spaces

    // Save JSON string to a file
    const filePath = `./data/blogs/${id}.json`; // File path to save the JSON
    try {
        fs.writeFileSync(filePath, jsonString);
        console.log('JSON file has been saved successfully!');
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }

    res.render('blog.ejs', {blogData});

});

app.listen(3000, () => {
    console.log("Server has started");
});
