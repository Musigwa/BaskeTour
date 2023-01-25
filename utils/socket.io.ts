import { io } from 'socket.io-client';

const socket = io('https://api.ullipicks.com/api-docs', {
  autoConnect: true,
  auth: { token: 'abcd' },
}).connect();

export default socket;
