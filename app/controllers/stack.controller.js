const stackService = require('../services/stack.service')

class StackController {
  pop(req, res) {
    stackService.pop();

    return res.status(200).json({
      status: 200,
      data: stackService.stack,
      message: "OK",
    });
  }

  push(req, res) {
    stackService.push(req.body.data);

    return res.status(200).json({
      status: 200,
      data: stackService.stack,
      message: "OK",
    });
  }
}

module.exports = new StackController();
