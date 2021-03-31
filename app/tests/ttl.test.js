const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {StatusCodes} = require('http-status-codes')

chai.use(chaiHttp);

const ROUTE_API_TTL = '/api/ttl';

const TEST_ITEM_NAME_KEY = 'name';
const TEST_ITEM_NAME_VALUE = 'John';
const TEST_ITEM_NAME_NEW_VALUE = 'Larry';
const TEST_ITEM_NAME_TTL = 3 * 1000; // ms

const TEST_ITEM_AGE_KEY = 'age';

describe('In-memory key-value store with TTL', () => {
  it('Set "name" to "John"', (done) => {
    chai.request(server)
      .post(ROUTE_API_TTL)
      .send(getRequestData(TEST_ITEM_NAME_KEY, TEST_ITEM_NAME_VALUE))
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.name.value.should.equal(TEST_ITEM_NAME_VALUE);
        done();
      });
  });

  it('Get "name" (should returns John)', (done) => {
    chai.request(server)
      .get(ROUTE_API_TTL)
      .query({key: TEST_ITEM_NAME_KEY})
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.value.should.equal(TEST_ITEM_NAME_VALUE);
        done();
      });
  });

  it('Get "age" (should return an empty value)', (done) => {
    chai.request(server)
      .get(ROUTE_API_TTL)
      .query({key: TEST_ITEM_AGE_KEY})
      .end((err, res) => {
        res.should.have.status(StatusCodes.NOT_FOUND);
        res.body.should.be.a('object');
        res.body.data.should.empty;
        done();
      });
  });

  it('Set "name" to "Larry" with a TTL', (done) => {
    chai.request(server)
      .post(ROUTE_API_TTL)
      .send(getRequestData(TEST_ITEM_NAME_KEY, TEST_ITEM_NAME_NEW_VALUE, TEST_ITEM_NAME_TTL))
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.name.value.should.equal(TEST_ITEM_NAME_NEW_VALUE);
        res.body.data.name.ttl.should.equal(TEST_ITEM_NAME_TTL);
        done();
      });
  });

  it('Get "name" before TTL expired', (done) => {
    chai.request(server)
      .get(ROUTE_API_TTL)
      .query({key: TEST_ITEM_NAME_KEY})
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.value.should.equal(TEST_ITEM_NAME_NEW_VALUE);
        done();
      });
  });

  it('Get "name" after TTL expired', (done) => {
    setTimeout(() => {
      chai.request(server)
        .get(ROUTE_API_TTL)
        .query({key: TEST_ITEM_NAME_KEY})
        .end((err, res) => {
          res.should.have.status(StatusCodes.NOT_FOUND);
          res.body.should.be.a('object');
          res.body.data.should.empty;
          done();
        });
    }, TEST_ITEM_NAME_TTL);
  });
});

function getRequestData(key, value, ttl = null) {
  return {
    data: {
      key: key,
      value: value,
      ttl: ttl,
    }
  }
}
