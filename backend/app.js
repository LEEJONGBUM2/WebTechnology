const http = require('http');
const mongoose = require('mongoose');//mongoDB
const express = require('express'); //express.js
//const bodyParser = require('body-parser');//HTTP Body를 parsing(변환)을 해준다.
const bcrypt = require('bcrypt');//비밀번호(암호관련)
const jwthc = require('jsonwebtoken'); //파일 포맷인데 자바스크립트 String으로 전달하게 만듬 (인증관련 기능) //node.js 기본 모듈
const jwtp = require('jsonwebtoken'); //파일 포맷인데 자바스크립트 String으로 전달하게 만듬 (인증관련 기능) //node.js 기본 모듈
const checkAuthHC = require("./check-hcAdmin");
const checkAuthP = require("./check-patient");

const HCAdmin = require('./models/hcAdmin');
const Patient = require('./models/patient');
const VacCentre = require('./models/vacCentre');
const VaccineBatch = require('./models/vaccineBatch');
const SelectVac = require('./models/selectVac');
const SelectCentre = require('./models/selectCentre');
const PatientVaccine = require('./models/patientVaccine');
// 경로 나타냄 //결합 데이터

const app = express();

//MongoDB account: emcncn3@gmail.com
//MongoDB password: help1234

//MongoDB connect: mongodb+srv://leejongbum:leejongbum123@cluster0.lfshu.mongodb.net/myFirstDatabase1?retryWrites=true&w=majority

//user:leejongbum
//password:leejongbum123
//Dbname:myFirstDatabase1

//데이터베이스 연결
mongoose.connect("mongodb+srv://leejongbum:leejongbum123@cluster0.lfshu.mongodb.net/myFirstDatabase1?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Connecting...")
  })
  .catch(()=>{
    console.log('Cannot Connect To Database....Please try again')
  })

app.use(express.json());//API로 가져온것들을 JSON으로 Parsing해서 사용

app.use((req,res,next)=>{ //서버를 설정 (CORS)
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.post('/api/PCVS/user/register/hcadmin',(req, res, next) =>{
  bcrypt.hash(req.body.password,10).then(encrypt=>{
    let hcadmin = null//
    console.log(req.body.type)
    if(req.body.type=="HcAdmin"){
      console.log('This is Health Care Admin')
          hcadmin = new HCAdmin({
            username:req.body.username,
            password:encrypt,
            fullnameHC:req.body.fullnameHC,
            email:req.body.email,
            staffID:req.body.staffID,
            type:'HcAdmin',
         })
      }

      hcadmin.save().then(result=>{
      console.log(hcadmin);
      res.status(201).json({
        message:'Admin created!',
        result:result
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      })
      console.log(err);
    })
  })
})

app.post('/api/PCVS/patient/register',(req, res, next) =>{
  bcrypt.hash(req.body.password,10).then(encrypt=>{
    let patient = null
    console.log(req.body.type)
    if(req.body.type=="Patient"){
      console.log('This is Patient')
      patient = new Patient({
            username:req.body.username,
            password:encrypt,
            fullnameP:req.body.fullnameP,
            email:req.body.email,
            passport:req.body.passport,
            type:'Patient',
         })
      }
      patient.save().then(result2=>{
      console.log(patient);
      res.status(201).json({
        message:'Patient created!',
        result2:result2
      });
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      })
      console.log(err);
    })
  })
})

app.post(//post
  '/api/PCVS/hcAdmin/login', //string, url
  //여기서는 유효성 검사가 불필요하다.
  (req, res, next) => { // [3]. execute //request 할때는 클라이언트 정보가 들어잇고,
    //결과값을 확인하고 서버가 클라이언트를 전달을 할때 response를 쓴다. (핵심기능은 response 이다.)
  let loginHcAdmin;
  console.log(req.body.username)

    console.log(1) //Promise 값이 return 된다.
    const waitingPromise=HCAdmin.findOne({username:req.body.username}) //console(1) console waiting promise,
    waitingPromise
    .then(hcadmin=>{ console.log(3) //console(3) MongoDB가 결과를 주었을때 callback 형식으로
      //실행이 된다.
    //user table 에서 username: req.body.username
    //then이 promise 하고 연관, findone이 promise를 return 한다. req, res 모델에 포함되어 있다.
    if(!hcadmin){
      return res.status(401).json({
        message: "Health Care Admin Not Found...Please check your username!"
      })
    }
    loginHcAdmin = hcadmin;
    return bcrypt.compare(req.body.password, hcadmin.password)
    //암호화에 대해서 로직 포함 확인 (패스워드 유효성 검사)
    // 콜백 안에서 promise 리턴 가능 //then 이 2번쓴걸 메소드 체이닝
  })

  .then(result => {
    if(!result){
      return res.status(400).json({
        message: 'Invalid Password...Please Try Again!'
      });
    }
    const token = jwthc.sign( //의미는 토큰을 생성한다.
      {hcadmin: loginHcAdmin}, //토큰이 들어가는 정보이다.
      'PCVS_HCAdmin_validatation_token',
      {expiresIn: '2h'} //2시간 동안 토큰 데이터가 유효하다.
      );
      res.status(200).json({ //[4].  succeed to login (token)
        token:token,
        hcadmin:loginHcAdmin
      })
  })
  .catch(err=>{
    return res.status(402).json({
      message: 'Login Failed....'
    })
  })
  console.log(2) //console(2) 결과값은 기다리는중 2를 실행한다.
})

app.post(//post
  '/api/PCVS/patient/login', //string, url
  //여기서는 유효성 검사가 불필요하다.
  (req, res, next) => { // [3]. execute //request 할때는 클라이언트 정보가 들어잇고,
    //결과값을 확인하고 서버가 클라이언트를 전달을 할때 response를 쓴다. (핵심기능은 response 이다.)
  let loginPatient;
  console.log(req.body.username)

    console.log(1) //Promise 값이 return 된다.
    const waitingPromise=Patient.findOne({username:req.body.username}) //console(1) console waiting promise,
    waitingPromise
    .then(patient=>{ console.log(3) //console(3) MongoDB가 결과를 주었을때 callback 형식으로
      //실행이 된다.
    //user table 에서 username: req.body.username
    //then이 promise 하고 연관, findone이 promise를 return 한다. req, res 모델에 포함되어 있다.
    if(!patient){
      return res.status(401).json({
        message: "Patient Not Found...Please check your username!"
      })
    }
    loginPatient = patient;
    return bcrypt.compare(req.body.password, patient.password)
    //암호화에 대해서 로직 포함 확인 (패스워드 유효성 검사)
    // 콜백 안에서 promise 리턴 가능 //then 이 2번쓴걸 메소드 체이닝
  })

  .then(result2 => {
    if(!result2){
      return res.status(400).json({
        message: 'Invalid Password...Please Try Again!'
      });
    }
    const token = jwtp.sign( //의미는 토큰을 생성한다.
      {patient: loginPatient}, //토큰이 들어가는 정보이다.
      'PCVS_Patient_validatation_token',
      {expiresIn: '2h'} //2시간 동안 토큰 데이터가 유효하다.
      );
      res.status(200).json({ //[4].  succeed to login (token)
        token:token,
        patient:loginPatient
      })
  })
  .catch(err=>{
    return res.status(402).json({
      message: 'Login Failed....'
    })
  })
  console.log(2) //console(2) 결과값은 기다리는중 2를 실행한다.
})

app.post('/api/PCVS/:hcadminID/vaccinebatch',(req, res, next) =>{
  const vaccineBatch = new VaccineBatch({
    vacID: req.body.vacID,
    batchNo: req.body.batchNo,
    expiryDate: req.body.expiryDate,
    quantityAvailable: req.body.quantityAvailable,
    status: req.body.status,
    appointmentDate: req.body.appointmentDate,
    manufactuer: req.body.manufactuer,
    vacName: req.body.vacName,
    remarks: '',
  })
  console.log('Before Save')
  vaccineBatch.save().then(result=>{
    console.log(vaccineBatch)
    res.status(201).json({
      message: 'New Vaccine List has been created into the vaccinebatch',
      vaccineBatchID:result._id
    })
  })
  console.log('After Save')
})

app.delete("/api/PCVS/:hcadminID/vaccinebatch/:vaccineBatchID",checkAuthHC, (req, res, next) => {
  VaccineBatch.deleteOne
  ({_id: req.params.vaccineBatchID})
  .then(result=>{
    console.log(result);
     res.status(200).json(
      {message: "Vaccine Batch deleted!"});

  })
});

app.post('/api/PCVS/vaccentre',  (req, res, next) =>{
  const vacCentre = new VacCentre({
    centreName: req.body.centreName,
    centreAddress: 'Damansara',
    vacName: 'Pfizer',
    //hcAdminID:req.body.hcAdminID
  })
  console.log('Before Save')
  vacCentre.save().then(result=>{
    console.log(vacCentre)
    res.status(201).json({
      message: 'Centre Name has been created into the vacCentre',
      centreID:result._id
    })
  })
  console.log('After Save')
})


app.post('/api/PCVS/viewvac/:patientID/:vaccineBatchID',(req, res, next) =>{ //TODO Q3
  const patientVaccine = new PatientVaccine({
    patientID:req.params.patientID,
    vaccineBatchID: req.params.vaccineBatchID, //2개의 (데이터)테이블을 하나의 레코드로 저장을 한다.
  })
  console.log('Before Save')
  // step1
  patientVaccine.save().then(result=>{
    //[step3]
    console.log(patientVaccine)
      res.status(200).json({
        message:"Add the Viewing the vaccine list with patient!",
        patientVaccineId: result._id
      })
  })

  console.log('After Save')
})

app.get('/api/PCVS/managevac',(req, res, next ) => { //TODO Q4
  PatientVaccine.find().then(patientVaccine=>{
    console.log(patientVaccine)

    Promise.all(patientVaccine.map((item)=>{//복수계의 비동기를 기다린다.
      return Promise.all(
        [
          Patient.findOne(item.patientID),
          VaccineBatch.findOne(item.vaccineBatchID),
        ]
      )

    })).then((patientVaccine)=>{

      res.status(200).json({
        message: 'view the management of vaccination appointment',
        patientVaccine: patientVaccine
      })

    })
  })
})

app.get('/api/PCVS/viewvac/:patientID',(req, res, next ) => { //TODO Q4
  User.find({patientID:req.params.patient_id}).then(patientVaccine=>{
    console.log(patientVaccine)
    res.status(200).json({
      message: 'view the management of vaccine list',
      tester:tester
    })
  })
})

app.get('/api/PCVS/vaccentre',(req, res, next) =>{ //프론트엔드에 해당하는 request값을 가진다.
  VacCentre.find().then(centre=>{ //user_id 값을 읽을때 params를 통해서 읽음
    res.status(200).json({
      message:'This Health care Admin has centre',
      vacCentre:centre
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json({
      message:'wrong fetch'
    })
  })
})

app.get('/api/PCVS/vaccinebatch',(req, res, next) =>{ //프론트엔드에 해당하는 request값을 가진다.
  VaccineBatch.find().then(batch=>{ //user_id 값을 읽을때 params를 통해서 읽음
    res.status(200).json({
      message:'This Health care Admin has added new vaccine list',
      vaccineBatch:batch
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json({
      message:'wrong fetch'
    })
  })
})

app.get('/api/PCVS/selectvac',(req, res, next) =>{ //프론트엔드에 해당하는 request값을 가진다.
  SelectVac.find().then(vac=>{ //user_id 값을 읽을때 params를 통해서 읽음
    res.status(200).json({
      message:'show the list of selection of vaccine',
      vac:vac
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json({
      message:'wrong fetch'
    })
  })
})

app.get('/api/PCVS/viewvac',(req, res, next) =>{ //프론트엔드에 해당하는 request값을 가진다.
  SelectCentre.find().then(selectCentre=>{ //user_id 값을 읽을때 params를 통해서 읽음
    res.status(200).json({
      message:'show the list of selection of vaccine',
      selectCentre:selectCentre
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json({
      message:'wrong fetch'
    })
  })
})

app.get('/api/PCVS/selectbatchno',(req, res, next) =>{ //프론트엔드에 해당하는 request값을 가진다.
  VaccineBatch.find().then(vaccineBatch=>{ //user_id 값을 읽을때 params를 통해서 읽음
    res.status(200).json({
      message:'show the list of selection of batch number',
      vaccineBatch:vaccineBatch
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json({
      message:'wrong fetch'
    })
  })
})

app.put('/api/PCVS/updateDate/',(req,res,next)=>{
  VaccineBatch.updateOne({batchNo:req.body.batchNo},
    {appointmentDate:req.body.appointmentDate}).then(DateUpdateResult=>{
    res.status(200).json({
      message:'Appointment Date Updated Successful'
    });
  }).catch(DateUpdatedErr=>{
    console.log(DateUpdatedErr);
    console.log("Date Update Error");
  })
})

app.put('/api/PCVS/updateStatus/',(req,res,next)=>{
  VaccineBatch.updateOne({_id:req.body.vaccineBatchID},
    {status:req.body.status}).then(updateStatusResult=>{
    res.status(200).json({
      message:'Succeed to update the Status!'
    });
  }).catch(updateStatusErr=>{
    console.log(updateStatusErr);
    console.log("Status Update Error");
  })
})

app.put('/api/PCVS/updateStatusA/',(req,res,next)=>{

//   remarks: "dsfdfsfd"
// status: "administered"
// vaccineBatchID: "6191d1b978d49f9bd21980c1"

console.log('>>>>>',req.body)
  VaccineBatch.updateOne({_id:req.body.vaccineBatchID},
    {remarks:req.body.remarks, status:req.body.status}).then(updateStatusAResult=>{
    res.status(200).json({
      message:'Succeed to update the Status (Administered)!'
    });
  }).catch(updateStatusAErr=>{
    console.log(updateStatusAErr);
    console.log("StatusA Update Error");
  })
})

module.exports=app;
