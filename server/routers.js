const { broadcastTrainInfomation } = require('./controllers/train');

module.exports = (app, io) => {
    broadcastTrainInfomation(io);
}