const express = require("express");
const http = require('http');
const fs = require('fs');
const mrouter = require("./routers/meetup-router");
const urouter = require("./routers/auth-router");
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
const swaggerFile = fs.readFileSync('./swagger.json', 'utf8');
const swaggerDocument = JSON.parse(swaggerFile);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', [mrouter, urouter]);
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