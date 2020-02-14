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

//AsyncAwait
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Rondom dog image saved to file!");
  } catch (err) {
    console.log(err);

    //throw the error
    throw err;
  }
  return "2: READY GAN!";
};

/*
//Handle error and return value  1
console.log("1: Will get dog pics!");
getDogPic()
  .then(x => {
    console.log(x);
    console.log("3: Done getting dog pics!");
  })
  .catch(err => {
    console.log("ERROR :(");
  });
*/

//Handle error and return value  2

(async () => {
  try {
    console.log("1: Will get dog pics!");
    //Access return values with then methode
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR :(");
  }
})();

/*

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

*/
