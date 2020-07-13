const router = require('express').Router()

// business error code, negative separate with http status code
const success = 0
const failure = -1
const invalidParams = -2

const regExp = new RegExp("^\\d+$");

const caculatorModular = digits => {
  sum = 0
  for (let i = 0; i < digits.length; i++)
    sum += digits[i] * (10 - i)
  return sum  % 11
}

const recontructISBN = (digits) => {
  const digitLenth = digits.length - 1
  let checksum = null
  const restoreDitgits = new Array()
  for (let i = 0; i < digits.length; i++) {
    if (i < digitLenth) restoreDitgits.push(parseInt(digits[i]))
    else checksum = parseInt(digits[i])
  }
  return { digits: restoreDitgits, checksum }
}

const checksumDigits = (digits, checksum) =>  caculatorModular(digits) === checksum


// check valid isbn
router.post('/', async (req, res) => {
  const digitString = req.body.digits ? `${req.body.digits}`: null
  let respone = {}
  if (digitString.length > 11) {
    if (regExp.test(digitString)) {
      const { digits, checksum } = recontructISBN(digitString)
      if (checksumDigits(digits, checksum)) {
        respone.msg = 'sucessfully'
        respone.valid = true
        respone.err = 0
      } else {
        respone.msg = 'invalid ISBN'
        respone.valid = false
        respone.err = failure
      }
    } else {
      respone.msg = 'digits require is number'
      respone.err = invalidParams
    }
  } else {
    respone.msg = 'body require feild digits'
    respone.err = invalidParams
  }
  res.status(200).json(respone)
})

module.exports = router;