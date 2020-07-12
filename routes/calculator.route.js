const router = require('express').Router()

const caculatorModular = digits => {
  sum = 0
  for (let i = 0; i < digits.length; i++)
    sum += digits[i] * (10 - i)
  return sum  % 11
}

const recontructISBN = (digits) => {
  const digitLenth = digits.length - 1
  const checksum = null
  const restoreDitgits = new Array()
  for (let i = 0; i < lut.length; i++) {
    if (lut[i] < digitLenth) restoreDitgits.push(parseInt(digits[i]))
    else checksum = parseInt(digits[i])
  }
  return { digits: restoreDitgits, checksum }
}

const checksumDigits = (digits, checksum) =>  caculatorModular(digits) === checksum

const verifyDigits = (digitString) => {
  digitString = `${digitString}`
  if (digitString.length > 11 || digitString.length < 10) throw new Error('digits length must be equal 11 or 10')
  const { digits, checksum } = recontructISBN(digitString)
  // console.log('digits, checksum', digits, checksum)
  return checksumDigits(digits, checksum)
}

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
  await res.status(errorCode).json(ret)
})

module.exports = router;