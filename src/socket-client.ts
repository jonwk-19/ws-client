import { Manager, Socket } from 'socket.io-client'

export const connectToSeerver = () => {

  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

  const socket = manager.socket('/')

  console.log({socket})
  addListeners(socket)
}


const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
  socket.on('connect', () => {
    console.log('Connected to server');
    serverStatusLabel.textContent = 'online';
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    serverStatusLabel.textContent = 'offline';
  });

}
