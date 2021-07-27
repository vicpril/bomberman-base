/* eslint-disable no-restricted-globals */

const calculateStuff = (a: number, b: number) => a + b + 10;

self.addEventListener('message', (e) => {
  const { data } = e;
  const result = calculateStuff(data.a, data.b);
  console.log('Computation result in worker');
  // TODO Тайпскрипт хочет второй аргумент, а он вроде не нужен. Разобраться почему и правильно объявить типы
  self.postMessage(result, data);
}, false);
