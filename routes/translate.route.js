const router = require('express').Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { json } = require('express')
const adapter = new FileSync('./db/en-vi.json')
const db = low(adapter)

const success = 0
const failure = -1
const invalidParams = -2

// get meaning of word
router.get('/', async (req, res) => {
  const word = req.query.word ? req.query.word.toLowerCase(): null
  let respone = {}
  if(word) {
    respone.msg='sucessfully'
    respone.word = word
    respone.mean = db.get(word).value() || 'unknown'
    respone.err = success
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
    
    db.set(word, mean)
      .write()
      
    const item = {}
    item[word] = mean
    respone.msg='sucessfully'
    respone.item = item
    respone.err = success
  } else {
    respone.msg='invalid params'
    respone.err=invalidParams
  }
  res.status(200).json(respone)
})

router.delete('/', (req, res) => {
})

router.patch('/', (req, res) => {})

module.exports = router;