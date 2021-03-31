const server = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {StatusCodes} = require('http-status-codes')

chai.use(chaiHttp);

const ROUTE_API_STACK = '/api/stack';

const TEST_ITEM_HELLO = 'Hello';
const TEST_ITEM_WORLD = 'World';
const TEST_ITEM_AGAIN = 'Again';

describe('In-memory stack (LIFO)', () => {
  it('Add "Hello" to stack', (done) => {
    chai.request(server)
      .post(ROUTE_API_STACK)
      .send(getRequestData(TEST_ITEM_HELLO))
      .end((err, res) => {
        res.should.have.status(StatusCodes.CREATED);
        res.body.should.be.a('object');
        res.body.data[0].should.equal(TEST_ITEM_HELLO);
        res.body.data.length.should.be.eql(1);
        done();
      });
  });

  it('Add "World" to stack', (done) => {
    chai.request(server)
      .post(ROUTE_API_STACK)
      .send(getRequestData(TEST_ITEM_WORLD))
      .end((err, res) => {
        res.should.have.status(StatusCodes.CREATED);
        res.body.should.be.a('object');
        res.body.data.length.should.be.eql(2);
        done();
      });
  });

  it('Get item from stack ("World" would be returned)', (done) => {
    chai.request(server)
      .get(ROUTE_API_STACK)
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.should.equal(TEST_ITEM_WORLD);
        done();
      });
  });

  it('Add "Again" to stack', (done) => {
    chai.request(server)
      .post(ROUTE_API_STACK)
      .send(getRequestData(TEST_ITEM_AGAIN))
      .end((err, res) => {
        res.should.have.status(StatusCodes.CREATED);
        res.body.should.be.a('object');
        res.body.data[1].should.equal(TEST_ITEM_AGAIN);
        res.body.data.length.should.be.eql(2);
        done();
      });
  });

  it('Get item from stack ("Again" would be returned)', (done) => {
    chai.request(server)
      .get(ROUTE_API_STACK)
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.should.equal(TEST_ITEM_AGAIN);
        done();
      });
  });

  it('Get item from stack ("Hello" would be returned)', (done) => {
    chai.request(server)
      .get(ROUTE_API_STACK)
      .end((err, res) => {
        res.should.have.status(StatusCodes.OK);
        res.body.should.be.a('object');
        res.body.data.should.equal(TEST_ITEM_HELLO);
        done();
      });
  });
});

function getRequestData(item) {
  return {
    data: {
      item: item,
    }
  }
}
