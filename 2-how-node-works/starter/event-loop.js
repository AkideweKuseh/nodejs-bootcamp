const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

// process.env.UV_THREADPOOL_SIZE = 4; // setting the number of threads in the threadpool
setTimeout(() => console.log('Timer 1 Finished'), 0);
setImmediate(() => console.log('Immediate 1 Finished'));

fs.readFile('test-file.txt', () => {
  console.log('File read - I/O done');
  console.log('--------------------');

  setTimeout(() => console.log('Timer 2 Finished'), 0);
  setTimeout(() => console.log('Timer 2 Finished(3s)'), 3000);
  setImmediate(() => console.log('Immediate 2 Finished'));

  process.nextTick(() => console.log('Process.nexTick'));

  crypto.pbkdf2('Passwrod', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'Password encrypted')
  );
  crypto.pbkdf2('Passwrod', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'Password encrypted')
  );
  crypto.pbkdf2('Passwrod', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'Password encrypted')
  );
  crypto.pbkdf2('Passwrod', 'salt', 100000, 1024, 'sha512', () =>
    console.log(Date.now() - start, 'Password encrypted')
  );
});

console.log('Top level Stuff :)');
