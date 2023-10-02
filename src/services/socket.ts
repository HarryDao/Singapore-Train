import openSocketIO, { Socket } from "socket.io-client";
import url from "url";
import { SERVER_URL } from "configs";

export enum SocketIOEvents {
  connect = "connect",
  trainInformation = "train-information",
}

export class SocketIO {
  static socket: SocketIO | undefined = undefined;

  static async getSocket(): Promise<SocketIO> {
    if (!SocketIO.socket) {
      SocketIO.socket = new SocketIO();
      await SocketIO.socket.init();
    }

    return SocketIO.socket;
  }

  io: Socket | undefined = undefined;

  private init(): Promise<Socket> {
    return new Promise((resolve) => {
      const { protocol, host, path } = url.parse(SERVER_URL);
      this.io = openSocketIO(`${protocol}//${host}`, {
        path: `${path || ""}/socket.io`,
      });
      this.io.on(SocketIOEvents.connect, () => {
        resolve(this.io!);
      });
    });
  }

  catchTrainInformation = <T>(onData: (data: T) => any) => {
    this.io?.on(SocketIOEvents.trainInformation, onData);
  };
}
