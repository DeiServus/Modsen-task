const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app);

//app.use('/api', []);

const start = async ()=> {
    try {
        server.listen(5000, async() => {
            console.log("Server is running on port 5000");
        });
    } catch(e) {
        console.log(e);
    }
}

start();