import { io } from 'socket.io-client';
import { host } from '../environment';
import { useAppSelector } from './useStore';

export default function useSocketIO() {
  const { token } = useAppSelector(({ auth }) => auth);
  return io(`${host}?token=${token}`);
}
