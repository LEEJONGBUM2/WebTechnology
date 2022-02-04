const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const vaccineBatchSchema = mongoose.Schema({
  vacID: {type: String, required: false},
  batchNo: {type: String, required: true}, //required는 저 key가 잇어야 되나? //(Unique)이 테이블에서 값이 중복이 되면 안됨
  expiryDate: {type: Date, required: true},
  quantityAvailable:{type:Number, required:true},
  status:{type:String, required:false},
  appointmentDate: {type: Date, required: false},
  manufactuer: {type: String, required: false},
  vacName:{type:String, required:false},
  remarks:{type:String,required:false},
})
vaccineBatchSchema.plugin(uniqueValidator);

module.exports = mongoose.model('VaccineBatch',vaccineBatchSchema); //userschema 들어잇는 포맷을 정한다.
