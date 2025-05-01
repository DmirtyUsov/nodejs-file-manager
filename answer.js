export class Answer {
  #isOk = false;
  #text = undefined;
  #table = undefined;

  get isOk() {
    return this.#isOk;
  }
  set isOk(isOk) {
    this.#isOk = isOk;
  }

  set table(table) {
    this.#table = table;
  }

  get table() {
    return this.#table;
  }
}
