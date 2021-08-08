/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
const startServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((error) => {
      console.log('ServiceWorker registration failed: ', error);
    });
  }
};

const startComputationWorker = () => {
  const difficultComputationWorker = new Worker('computationWorker.js');
  difficultComputationWorker.postMessage({ a: 1, b: 14, source: 'computationWorker' });

  difficultComputationWorker.addEventListener('message', (e) => {
    // eslint-disable-next-line no-console
    console.log('Computation result received in app', e.data);
  }, false);
};

export function startAllWorkers() {
  startServiceWorker();
  startComputationWorker();
}
