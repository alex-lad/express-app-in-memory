class StackService {
  constructor() {
    this.stack = [];
  }

  pop() {
    this.stack.pop();
  }

  push(item) {
    this.stack.push(item);
  }
}

module.exports = new StackService();
