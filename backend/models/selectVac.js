const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const selectVacSchema = mongoose.Schema({
  vacID: {type: String, required: true},
  manufacturer: {type: String, required: true},
  vacName:{type:String, required:true},

})

selectVacSchema.plugin(uniqueValidator);

module.exports = mongoose.model('SelectVac',selectVacSchema); //userschema 들어잇는 포맷을 정한다.
