const jwthc = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwthc.verify(token, 'PCVS_HCAdmin_validatation_token');

    //throw new Error()
    console.log('This is check HCAdmins js')
    console.log(token);
    next();
  } catch(err){
    res.status(401).json({
      message:"Invalid Authenticate HCAdmin..."
    })
  }
}
//미들웨어는 front-end request를 받아서 동작을 한다.
