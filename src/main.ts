import { connectToSeerver } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <input id='jwt-token' type='text' placeholder='JWT Token' />
    <button id='btn-connect'>Connect</button>
    <br /><br />
    <span id='server-status'>offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type your message here..." />
      <button type="submit">Send</button>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

// connectToSeerver()

const jwtToken = document.querySelector('#jwt-token') as HTMLInputElement;
const btnConnect = document.querySelector('#btn-connect') as HTMLButtonElement;

btnConnect.addEventListener('click', () => {

  if (jwtToken.value.trim().length <= 0) return alert('JWT Token is required');

  connectToSeerver( jwtToken.value.trim() );
});
