import { useEffect, useState } from 'react';
import { Observable } from '../helpers/Observable';

export const useObservable = <T>(observable: Observable<T>) => {
  const [value, setValue] = useState(observable.get());

  useEffect(() => {
    setValue(observable.get());
    return observable.subscribe(setValue);
  }, [observable]);

  return value;
};
