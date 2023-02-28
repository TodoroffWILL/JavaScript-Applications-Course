let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('Just Married..');
    } else {
      reject('Not yet..');
    }
  }, 3000);
});

promise.then((result) => {
  console.log(result);
});
promise.catch((reason) => {
  console.log(reason);
});
