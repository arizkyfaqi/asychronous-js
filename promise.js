const fs = require("fs");
const superagent = require("superagent");

//Building Promises
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file! :(");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Could not write file :( ");
      resolve("success");
    });
  });
};

//use promise
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    //superagent support for promises
    //request data and bring back the data
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    //handles fulfilled promises
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);

    // fs.writeFile('dog-img.txt', res.body.message, err => {
    //   if (err) return console.log(err.message);
    //   console.log('Rondom dog image saved to file!');
    // });
  })
  .then(() => {
    console.log("Rondom dog image saved to file!");
  })
  //get called if there an error
  .catch(err => {
    console.log(err);
  });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {});
