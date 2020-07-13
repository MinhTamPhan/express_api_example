const router = require('express').Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { json } = require('express')
const adapter = new FileSync('./db/en-vi.json')
const db = low(adapter)

// business error code, negative separate with http status code
const success = 0
const failure = -1
const invalidParams = -2

// get meaning of word
router.get('/', async (req, res) => {
  const word = req.query.word ? req.query.word.toLowerCase(): null
  let respone = {}
  if(word) {
    const mean = db.get(word).value()
    if (mean) {
      respone.msg='sucessfully'
      respone.item = {
        word,
        mean: db.get(word).value() || 'unknown'
      }
      respone.err = success
    } else {
      respone.msg='the word not exists in dictionary'
      respone.item = {
      }
      respone.err = failure
    }
    
  } else {
    respone.msg='invalid params'
    respone.err=invalidParams
  }
  res.status(200).json(respone)
})

// create word-mean in dictionary
router.post('/', async (req, res) => {
  const word = req.body.word ? req.body.word.toLowerCase(): null
  const mean = req.body.mean ? req.body.mean.toLowerCase(): null
  let respone = {}
  if(word && mean) {
    try {
      db.set(word, mean).write()
    } catch (error) {
      respone.msg='failed to persistent this time'
      respone.err=failure
      res.status(200).json(respone)
      return
    }
    respone.msg='sucessfully'
    respone.item =  {
      word,
      mean
    }
    respone.err = success
  } else {
    respone.msg='invalid params'
    respone.err=invalidParams
  }
  res.status(200).json(respone)
})

// delete word in dictionary
router.delete('/', (req, res) => {
  const word = req.body.word ? req.body.word.toLowerCase(): null
  let respone = {}
  if(word) {
    const mean = db.get(word).value()
    if(mean) {
      try {
        db.unset(word).write()
      } catch (error) {
        respone.msg='failed to persistent this time'
        respone.err=failure
        res.status(200).json(respone)
        return
      }
      respone.msg='sucessfully'
      respone.item = {
        word, mean
      }
      respone.err = success
    } else {
      respone.msg='the word not exists in dictionary'
      respone.err=failure
    }
  } else {
    respone.msg='invalid params'
    respone.err=invalidParams
  }
  res.status(200).json(respone)
})

router.patch('/', (req, res) => {
  const word = req.body.word ? req.body.word.toLowerCase(): null
  const mean = req.body.mean ? req.body.mean.toLowerCase(): null
  let respone = {}
  if(word && mean) {
    const oldMean = db.get(word).value()
    if(oldMean) {
      try {
        db.set(word, mean).write()
      } catch (error) {
        respone.msg='failed to persistent this time'
        respone.err=failure
        res.status(200).json(respone)
        return
      }
      respone.msg='sucessfully'
      respone.item = {
        word, mean
      }
      respone.err = success
    } else {
      respone.msg='the word not exists'
      respone.err=invalidParams
    }
  }
  else {
    respone.msg='invalid params'
    respone.err=invalidParams
  }
  res.status(200).json(respone)
})

module.exports = router