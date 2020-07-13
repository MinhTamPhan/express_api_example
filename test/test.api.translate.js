// const axios = require('axios')
// const { response } = require('express')

// const fetchFrom = async (url = '', method = 'POST', data = {}, accessToken = '') => {
//   const response = await axios({
//     headers: {
//       'x-access-token': accessToken
//     },
//     method,
//     url: url,
//     data: data
//   })
//   return response.data
// }
// const main = async() => {
//   let res =  await fetchFrom('http://localhost:5500/api/translate', 'GET')
//   asert res.err 
// }
// main()
const app = require('../app.js'),
      chai = require('chai'),
      request = require('supertest')
const assert = require('assert')

describe('### GET /api/translate?word=i', () => {
  it('should return error code -1', (done) => {
    request(app)
    .get('/api/translate?word=i')
    .expect(200)
    .end((err, res) => {
      assert.equal(res.body.err, -1)
      if (err) return done(err)
      done()
    })
  })
})

describe('### POST /api/translate', () => {
  it('should return error code -1', (done) => {
    request(app)
    .post('/api/translate')
    .send({word:'i', mean: 'tôi'})
    .expect(200)
    .end((err, res) => {
      assert.equal(res.body.err, 0)
      if (err) return done(err)
      done()
    })
  })
})

describe('Test curl translator', () => {
  it('should return error code -2', (done) => {
    request(app)
    .get('/api/translate')
    .expect(200)
    .end((err, res) => {
      assert.equal(res.body.err, -2)
      if (err) return done(err)
      done()
    })
  })
})