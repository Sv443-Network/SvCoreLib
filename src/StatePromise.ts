type PromiseState = "initialized" | "pending" | "resolved" | "rejected";

export class StatePromise<T = any> {
  private intPromise: Promise<T> | (() => Promise<T>);
  public state: PromiseState;

  constructor(promise: Promise<T> | (() => Promise<T>)) {
    if(!(promise instanceof Promise))
      throw new TypeError("Wrong type provided in constructor of StatePromise - expected instance of \"Promise\" class");

    this.intPromise = promise;
    this.state = "initialized";
  }

  exec(): Promise<T> {
    this.state = "pending";

    return new Promise((res, rej) => {
      const prom = typeof this.intPromise === "function" ? this.intPromise() : this.intPromise;
      prom.then((...args) => {
        this.state = "resolved";
        return res(...args);
      }).catch((...args) => {
        this.state = "rejected";
        return rej(...args);
      });
    });
  }

  getState() {
    return this.state;
  }
}
