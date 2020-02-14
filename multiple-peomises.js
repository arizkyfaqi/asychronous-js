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

    //Multiple Promises
    const res1Pro = superagent.get(
      `https://dg.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Rondom dog image saved to file!");
  } catch (err) {
    console.log(err);

    //throw the error
    throw err;
  }
  return "2: READY!";
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
