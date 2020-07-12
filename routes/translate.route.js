const router = require('express').Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db/en-vi.json')
const db = low(adapter).toJSON()


// create receiver_info
router.get('/', async (req, res) => {
  const isValid = true;//validateReceiverData(req.body);
  let errorCode = 400;
  let ret = {
    msg: 'invalid parameters',
  };
  if (isValid) {
    let user = userModel.singleByAccountNum(req.body.accountNum);
    let entity = {
      owner_id: req.body.id,
      account_id: user.id,
      alias_name: req.body.aliasName
    };
    let newReceiver = await receiverModel.add(entity);
    errorCode = 200;
    ret = {
      msg: 'successfully',
      newReceiver: entity
    }
  }
  res.status(errorCode).json(ret)
})

router.post('/', async (req, res) => {
})

router.delete('/', (req, res) => {
})

router.patch('/', (req, res) => {})

module.exports = router;