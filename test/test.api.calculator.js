const app = require('../app.js'),
      request = require('supertest')
const assert = require('assert')

describe('### GET /api/calculator', () => {
  it('verify ISBN digits valid, should return error code 0', (done) => {
    request(app)
    .post('/api/calculator')
    .send({digits: 47260607229})
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, 0)
      assert.equal(res.body.valid, true)
      done()
    })
  })
})


describe('### GET /api/calculator', () => {
  it('verify ISBN digits invalid, length < 11, should return error code -2 (invalid params)', (done) => {
    request(app)
    .post('/api/calculator')
    .send({digits: '472607229'})
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, -2)
      done()
    })
  })
})

describe('### GET /api/calculator', () => {
  it('verify ISBN digits invalid(contrain string), should return error code -2 (invalid params)', (done) => {
    request(app)
    .post('/api/calculator')
    .send({digits: '47260vv7229'})
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, -2)
      done()
    })
  })
})


describe('### GET /api/calculator', () => {
  it('verify ISBN digits invalid, should return error code -1', (done) => {
    request(app)
    .post('/api/calculator')
    .send({digits: 47260607259})
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, -1)
      assert.equal(res.body.valid, false)
      done()
    })
  })
})