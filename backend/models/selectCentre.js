const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const selectCentreSchema = mongoose.Schema({
  centreName: {type: String, required: true}, //required는 저 key가 잇어야 되나? //(Unique)이 테이블에서 값이 중복이 되면 안됨
  centreAddress: {type: String, required: true},
  vacName:{type:String, required:true},
  vaccineBatchID: {type: mongoose.Schema.Types.ObjectId, ref:'VaccineBatch'}
})

selectCentreSchema.plugin(uniqueValidator);

module.exports = mongoose.model('SelectCentre',selectCentreSchema); //userschema 들어잇는 포맷을 정한다.
