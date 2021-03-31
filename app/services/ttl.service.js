class TTLService {
  constructor() {
    this.map = new Map();
  }

  getByKey(key) {
    return this.map.get(key);
  }

  store(key, value, ttl) {
    this.map.set(key, {
      value: value,
      ttl: ttl,
    });

    if (Number.isInteger(ttl) && ttl > 0) {
      this.startTTLJob(key, ttl);
    }
  }

  delete(key) {
    return this.map.delete(key);
  }

  startTTLJob(key, ttl) {
    setTimeout(() => {
      this.map.delete(key);
    }, ttl);
  }
}

module.exports = new TTLService();
