const DEFAULT_NAME = 'Incognito😎';

class Annotator {
  _userName = DEFAULT_NAME;

  set userName(newName) {
    this._userName = newName || DEFAULT_NAME;
  }

  say(message, useFn) {
    useFn(message);
  }

  sayHi() {
    const message = `🖐 Welcome to the File Manager, ${this._userName}!`;
    this.say(message, console.info);
  }

  sayBye() {
    const message = `Thank you for using File Manager, ${this._userName}, goodbye! 👋`;
    this.say(message, console.info);
  }

  sayCurrentDir() {
    const message = `You are currently in \x1b[32m${process.cwd()} 📁\x1b[0m`;
    this.say(message, console.info);
  }

  askCommand() {
    const message = `Enter your command:`;
    this.say(message, console.info);
  }

  sayInvalidInput() {
    const message = `❗ Invalid input`;
    this.say(message, console.error);
  }

  sayAnswer(answer) {
    if (!answer) {
      return;
    }

    if(answer.text) {
      this.say(answer.text, console.info);
    }

    if(answer.table) {
      this.say(answer.table, console.table);
    }
  }
}

export const annotator = new Annotator();
