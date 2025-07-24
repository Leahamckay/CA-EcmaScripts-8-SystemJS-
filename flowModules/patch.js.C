const EventEmitter = require('events');
const dispatcher = new EventEmitter();

// Handler
dispatcher.on('connectiveEvent', (data) => {
  console.log('Connective handler received:', data);
});

// Dispatch
dispatcher.emit('connectiveEvent', { message: 'Hello from sub-dispatcher' });