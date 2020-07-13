const app = require('../app.js'),
      request = require('supertest')
const assert = require('assert')

describe('### GET /api/translate?word=i', () => {
  it('get word not exist in dictionary, should return error code -1', (done) => {
    request(app)
    .get('/api/translate?word=i')
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, -1)
      done()
    })
  })
})

describe('### POST /api/translate', () => {
  it('create pair word-mean in dictionary, should return error code 0', (done) => {
    request(app)
    .post('/api/translate')
    .send({word:'i', mean: 'tôi'})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      assert.equal(res.body.err, 0)
      done()
    })
  })
})

describe('### GET /api/translate?word=i', () => {
  it('get word exist in dictionary, should return error code 0', (done) => {
    request(app)
    .get('/api/translate?word=i')
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, 0)
      assert.equal(res.body.item.mean, 'tôi')
      done()
    })
  })
})

describe('### PATCH /api/translate', () => {
  it('update pair word-mean in dictionary,the word existing in dictionary, should return error code 0', (done) => {
    request(app)
    .patch('/api/translate')
    .send({word:'i', mean: 'tôi v2'})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      assert.equal(res.body.err, 0)
      done()
    })
  })
})

describe('### GET /api/translate?word=i', () => {
  it('get word after patch request, should return error code 0', (done) => {
    request(app)
    .get('/api/translate?word=i')
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, 0)
      assert.equal(res.body.item.mean, 'tôi v2')
      done()
    })
  })
})

describe('### Delete /api/translate', () => {
  it('delete pair word-mean in dictionary,the word existing in dictionary, should return error code 0', (done) => {
    request(app)
    .delete('/api/translate')
    .send({word:'i'})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      assert.equal(res.body.err, 0)
      done()
    })
  })
})

describe('### GET /api/translate?word=i', () => {
  it('get word after Delete request, should return error code -1', (done) => {
    request(app)
    .get('/api/translate?word=i')
    .expect(200)
    .end((err, res) => { 
      if (err) return done(err)
      assert.equal(res.body.err, -1)
      done()
    })
  })
})

describe('### Delete /api/translate', () => {
  it('delete pair word-mean in dictionary,the word not existing in dictionary, should return error code -1', (done) => {
    request(app)
    .delete('/api/translate')
    .send({word:'i'})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      assert.equal(res.body.err, -1)
      done()
    })
  })
})

describe('### GET /api/translate not passing params', () => {
  it('should return error code -2', (done) => {
    request(app)
    .get('/api/translate')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      assert.equal(res.body.err, -2)
      done()
    })
  })
})