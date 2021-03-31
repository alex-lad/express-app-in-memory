const {StatusCodes} = require('http-status-codes')
const ttlService = require('../services/ttl.service')

class TTLController {
  getByKey(req, res) {
    let el = ttlService.getByKey(req.query.key);

    return res.status(el ? StatusCodes.OK : StatusCodes.NOT_FOUND).json({
      data: el || {},
    });
  }

  store(req, res) {
    const data = req.body.data;

    ttlService.store(data.key, data.value, data.ttl);

    return res.status(StatusCodes.OK).json({
      data: Object.fromEntries(ttlService.map),
    });
  }

  delete(req, res) {
    const key = req.query.key;
    let el = ttlService.getByKey(key);
    let status = ttlService.delete(key);

    if (!el || !status) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        data: {},
      });
    }

    return res.status(StatusCodes.OK).json({
      data: el,
    });
  }
}

module.exports = new TTLController();
