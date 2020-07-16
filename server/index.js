const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routers = require('./routers');
const MAIN_PORT = process.env.PORT || 3001;
const REDIRECT_PORT = process.env.PORT_HTTP || 80;

function setupMainServer(port, sslConfigs) {
    const mainApp = express();
    let mainServer;

    if (sslConfigs) {
        mainApp.use((req, res, next) => {
            if(req.protocol === 'http') {
                res.redirect(301, `https://${req.headers.host}${req.url}`);
            }
            next();
        });

        mainServer = https.createServer(sslConfigs, mainApp);
        mainServer.listen(port, () => {
            console.log(`HTTPS Server running on port ${port}`);
        });
    } else {
        mainServer = http.createServer(mainApp);
        mainServer.listen(port, () => {
            console.log(`HTTP Server running on port ${port}`);
        });
    }
    
    const io = require('socket.io')(mainServer);
    
    mainApp.use(cors());
    mainApp.use(bodyParser.json({ type: '*/*' }));
    mainApp.use(morgan('dev'));
    
    routers(mainApp, io);
    
    mainApp.use(express.static(path.join(__dirname, '../build')));
    
    mainApp.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
};

function getSSLConfigs() {
    return {
        key: fs.readFileSync(
            path.join(__dirname, './ssl/key.key')
        ),
        cert: fs.readFileSync(
            path.join(__dirname, './ssl/key.crt')
        ),
        ca: fs.readFileSync(
            path.join(__dirname, './ssl/key.ca-bundle')
        )
    };
}

// Run server with HTTP
// setupMainServer(MAIN_PORT);

// Run server with HTTPS & redirect HTTP to HTTPS
setupMainServer(MAIN_PORT, getSSLConfigs());