class StackService {
  constructor() {
    this.stack = [];
  }

  pop() {
    return this.stack.pop();
  }

  push(item) {
    this.stack.push(item);
  }
}

module.exports = new StackService();
