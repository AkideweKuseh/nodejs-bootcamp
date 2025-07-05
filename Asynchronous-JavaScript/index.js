const fs = require('fs');
const superagent = require('superagent');

// Using Callbacks with superagent (Callback Hell)
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log('ERROR! 💥 : Could not Read File');
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breeds/image/random/${data}`)
    .end((err, res) => {
      if (err) return console.log(`ERROR! 💥:Could not find Breed ${data} `);
      console.log(res.body.message);
      const dogImage = res.body.message.join('\n');

      fs.writeFile('dog-img.txt', dogImage, (err) => {
        if (err) return console.log('ERROR! 💥: Could not write file');
        console.log('Random Dog Image saved to dog-img.txt');
      });
    });
});
*/

// Building promises for reading and writing files

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('ERROR! 💥 : Could not Read File');
      resolve(data);
      console.log(`Breed: ${data}`);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('ERROR! 💥: Could not write file');
      resolve('File written successfully');
    });
  });
};

// Using Promises with superagent

/*fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log('ERROR! 💥 : Could not Read File');
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breeds/image/random/${data}`)
    .then((res) => {
      if (err) return console.log(`ERROR! 💥:Could not find Breed ${data} `);
      console.log(res.body.message);
      const dogImage = res.body.message.join('\n');
      fs.writeFile('dog-img.txt', dogImage, (err) => {
        if (err) return console.log('ERROR! 💥: Could not write file');
        console.log('Random Dog Image saved to dog-img.txt');
      });
    });
});
*/

// using Built Promises
/*readFilePro(`${__dirname}/dog.txt`).then((data) => {
  return superagent
    .get(`https://dog.ceo/api/breeds/image/random/${data}`)
    .then((res) => {
      const dogImage = res.body.message.join('\n');
      return writeFilePro('dog-img.txt', dogImage);
    })
    .then(() => {
      console.log('Random Dog Image saved to dog-img.txt');
    })
    .catch((err) => {
      console.log(err);
    });
});
*/

// Using Async/Await with Promises

const getDogImage = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breeds/image/random/${data}`
    );
    console.log(res.body.message);
    const dogImage = res.body.message.join('\n');
    await writeFilePro('dog-img.txt', dogImage);
    console.log('Random Dog Image saved to dog-img.txt');
  } catch (err) {
    console.log(err);
  }
  return 'Dog Image Ready ✅';
};


// returning Value from Async Function
// console.log('Will get Dog Image 🐶');
// const x = getDogImage();
// console.log(x); // This will log a Promise object
// console.log('Done getting Dog Image 🐶');

console.log('Will get Dog Image 🐶');
(async () => {
    const x = await getDogImage();
    console.log(x); // This will log the resolved value from the async function
    console.log('Done getting Dog Image 🐶');
})();