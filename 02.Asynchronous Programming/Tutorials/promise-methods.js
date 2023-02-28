//Always Resolve Promise
let alwaysResolvingPromise = Promise.resolve('YES');
alwaysResolvingPromise
  .then((res) => console.log(res))
  .catch((err) => {
    console.log('catch NEVER USED');
  })
  .finally(() => {
    console.log('Always complile finally !');
  });
// Always Reject promise

let alwaysRejectingPromise = Promise.reject('NO');
alwaysRejectingPromise
  .then((res) => console.log('then is NEVER USED'))
  .catch((err) => {
    console.log(err);
  });
// If any promise broke it all brokes !

let multiplePromises = Promise.all([
  alwaysResolvingPromise,
  Promise.resolve('YES2'),
]);

multiplePromises.then((res) => {
  console.log(res);
});
