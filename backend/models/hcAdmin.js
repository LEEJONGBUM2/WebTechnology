const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const hcAdminSchema = mongoose.Schema({
  username: {type: String, required: true, unique:true}, //required는 저 key가 잇어야 되나? //(Unique)이 테이블에서 값이 중복이 되면 안됨
  password: {type: String, required: true},
  fullnameHC:{type:String, required:true},
  email: {type: String, required: true}, //which actor can i choose
  staffID: {type:String, required:true},
  type: {type:String, required:true},
  centreID: {type: mongoose.Schema.Types.ObjectId, ref:'VacCentre'}
})

hcAdminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('HcAdmin',hcAdminSchema); //userschema 들어잇는 포맷을 정한다.
