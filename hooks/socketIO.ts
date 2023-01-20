import { io } from 'socket.io-client';
import { useAppSelector } from './useStore';

export default function useSocketIO() {
  const { token } = useAppSelector(({ auth }) => auth);
  return io(`https://api.ullipicks.com?token=${token}`);
}
