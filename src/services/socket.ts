import openSocketIO from 'socket.io-client';
import { SOCKET_SERVER } from 'configs';

export enum SocketIOEvents {
    connect = 'connect',
    trainInformation = 'train-information'
};

export class SocketIO {
    static socket: (SocketIO | undefined) = undefined;

    static async getSocket(): Promise<SocketIO> {
        if (!SocketIO.socket) {
            SocketIO.socket = new SocketIO();
            await SocketIO.socket.init();
        }
        
        return SocketIO.socket;
    }

    io: (SocketIOClient.Socket | undefined) = undefined;

    private init(): Promise<SocketIOClient.Socket> {
        return new Promise(resolve => {
            this.io = openSocketIO(SOCKET_SERVER);
            this.io.on(SocketIOEvents.connect, () => {
                resolve(this.io);
            });
        });
    }

    catchTrainInformation = <T>(onData: (data: T) => any) => {
        this.io?.on(SocketIOEvents.trainInformation, onData);
    };
}