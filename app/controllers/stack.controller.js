const {StatusCodes} = require('http-status-codes')
const stackService = require('../services/stack.service')

class StackController {
  pop(req, res) {
    let lastEl = stackService.pop();

    return res.status(lastEl ? StatusCodes.OK : StatusCodes.NOT_FOUND).json({
      data: lastEl || {},
    });
  }

  push(req, res) {
    stackService.push(req.body.data.item);

    return res.status(StatusCodes.CREATED).json({
      data: stackService.stack,
    });
  }
}

module.exports = new StackController();
