const app = require('../app.js'),
      request = require('supertest')
const assert = require('assert')

describe('### GET /api/translate?word=i', () => {
  it('should return error code -1', (done) => {
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