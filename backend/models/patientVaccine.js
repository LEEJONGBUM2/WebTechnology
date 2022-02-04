const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const patientVaccineSchema = mongoose.Schema({
  patientID: {type: mongoose.Schema.Types.ObjectId, ref:'Patient'},
  vaccineBatchID: {type: mongoose.Schema.Types.ObjectId, ref:'VaccineBatch'}
  //required는 저 key가 잇어야 되나? //(Unique)이 테이블에서 값이 중복이 되면 안됨
})

patientVaccineSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PatientVaccine',patientVaccineSchema); //userschema 들어잇는 포맷을 정한다.
