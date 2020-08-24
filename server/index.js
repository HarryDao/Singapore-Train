const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routers = require('./routers');
const { SOCKET_PATH, PORT } = require('./configs');

const app = express();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});

const io = require('socket.io')(server);
    
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(morgan('dev'));

routers(app, io);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});