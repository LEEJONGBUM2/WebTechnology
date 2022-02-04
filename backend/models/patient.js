const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const patientSchema = mongoose.Schema({
  username: {type: String, required: true, unique:true}, //required는 저 key가 잇어야 되나? //(Unique)이 테이블에서 값이 중복이 되면 안됨
  password: {type: String, required: true},
  fullnameP:{type:String, required:true},
  email: {type: String, required: true}, //which actor can i choose
  passport: {type:String, required:true},
  type: {type:String, required:true},
})

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Patient',patientSchema); //userschema 들어잇는 포맷을 정한다.
