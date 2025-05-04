class Annotator {
  say(message, useFn) {
    useFn(message);
  }

  sayHi(userName) {
    const message = `🖐 Welcome to the File Manager, ${userName}!`;
    this.sayText(message);
  }

  sayBye(userName) {
    const message = `Thank you for using File Manager, ${userName}, goodbye! 👋`;
    this.sayText(message);
  }

  sayCurrentDir() {
    const message = `\nYou are currently in \x1b[32m${process.cwd()} 📁\x1b[0m`;
    this.sayText(message);
  }

  askCommand() {
    const message = `Enter your command:`;
    this.sayText(message);
  }

  sayInvalidInput() {
    const message = `Invalid input`;
    this.sayError(message);
  }

  sayTable(table) {
    this.say(table, console.table);
  }

  sayText(text) {
    this.say(text, console.info);
  }

  sayError(error) {
    this.say(`\n❗ ${error}`, console.error);
  }

  sayResult(text, isOk) {
    if (isOk) {
      this.sayText(text);
    } else {
      this.sayError(text);
    }
  }
}

export const annotator = new Annotator();
