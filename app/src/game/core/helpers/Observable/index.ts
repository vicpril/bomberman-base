type Listener<T> = (value: T) => void; // = React.Dispatch
type Unsubscriber = () => void; // = React.DispatchWithoutAction

export class Observable<T> {
    private listeners: Listener<T>[] = [];

    constructor(private value: T) {}

    get(): T {
      return this.value;
    }

    set(value: T) {
      if (this.value !== value) {
        this.value = value;
        this.listeners.forEach((l) => l(value));
      }
    }

    subscribe(listener: Listener<T>): Unsubscriber {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    }
}
