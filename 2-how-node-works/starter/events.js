const EventEmitter = require('events');

const saleEvent = new EventEmitter();

// creat an event emitter that emits an event after 3sec

setTimeout(() => saleEvent.emit('sell'), 3000);

// now we create an event listener that listens for the event and handle it with a callback

saleEvent.on('sell', () => console.log(`Item Sold`));
