import { useAppSelector } from './useStore';
import { io } from 'socket.io-client';

export default function useSocketIO() {
  const { token } = useAppSelector(({ auth }) => auth);
  const socket = io(`https://api.ullipicks.com?token=${token}`);
  socket.on('connect', (socket) => {
    console.log('socket', socket);
  });
  return {
    socket,
  };
}
