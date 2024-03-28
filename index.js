const express = require("express");
const http = require('http');
const router = require("./router");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/api', router);
app.use((err, req, res, next) => {
    return res.status(400).json({message: err.message});
})

const start = ()=> {
    try {
        server.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    } catch(e) {
        console.log(e);
    }
}

start();