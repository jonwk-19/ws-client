import { Manager, Socket } from 'socket.io-client'

export const connectToSeerver = () => {

  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

  const socket = manager.socket('/')

  console.log({socket})
  addListeners(socket)
}


const addListeners = (socket: Socket) => {
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;

  socket.on('connect', () => {
    console.log('Connected to server');
    serverStatusLabel.textContent = 'online';
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
    serverStatusLabel.textContent = 'offline';
  });

  socket.on('clients-updated', (clients: string[]) => {
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
    clientsUl.innerHTML = '';
    clients.forEach(client => {
      const li = document.createElement('li');
      li.textContent = client;
      clientsUl.appendChild(li);
    });
  });

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message.length > 0) {
      socket.emit('message-from-client', {
        id: socket.id,
        message
      });
      messageInput.value = '';
    }
  });

  socket.on('message-from-server', (payload: {fullName: string, message:string}) => {

    const li = document.createElement('li');
    li.innerHTML = `<strong>${payload.fullName}</strong>: ${payload.message}`;
    messagesUl.appendChild(li);
    messagesUl.scrollTop = messagesUl.scrollHeight; // Scroll to the bottom
  });

}
