/* eslint-disable no-restricted-globals */

const calculateStuff = (a, b) => a + b + 10;

this.addEventListener('message', (e) => {
  const { data } = e;
  if (data.source === 'computationWorker') {
    const result = calculateStuff(data.a, data.b);
    // eslint-disable-next-line no-console
    console.log('Computation result in worker', result);
    this.postMessage(result);
  }
}, false);
