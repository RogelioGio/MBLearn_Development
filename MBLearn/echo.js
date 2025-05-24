import Echo from 'laravel-echo';
import { io } from 'socket.io-client';

window.io = io;

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  host: `${import.meta.env.VITE_REVERB_SCHEME}://${import.meta.env.VITE_REVERB_HOST}:${import.meta.env.VITE_REVERB_PORT}`,
  transports: ['websocket'],
  forceTLS: false,
  disableStats: true,
  client: io,
});

console.log('Echo broadcaster:', 'reverb');
window.Echo = echo; // Makes Echo globally available
export default echo; // Allows import where needed


