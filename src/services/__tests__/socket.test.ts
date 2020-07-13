import { SocketIO, SocketIOEvents } from '../socket';

interface FnOutput {
    type: string,
    fn: Function
}

type FnInput = (type: string, fn: Function) => void

type SocketMock = {
    fns?: FnOutput[],
    on?: FnInput
}

jest.mock('socket.io-client', () => {
    return function(): SocketMock {
        return {
            fns: [],
            on: function(type, fn) {
                if (type === 'connect') {
                    fn();
                } else {
                    this.fns?.push({ type, fn });
                }
            }
        };
    };
});

describe('services/socket', () => {
    let socket: SocketIO;

    beforeEach(async () => {
        socket = await SocketIO.getSocket();
    });

    it('catchTrainInformation() correctly', () => {
        const testFn = jest.fn();
        socket.catchTrainInformation(testFn);

        const io = socket.io as SocketMock;
       
        expect(io.fns).toEqual([{
            type: SocketIOEvents.trainInformation,
            fn: testFn
        }]);
    });
});