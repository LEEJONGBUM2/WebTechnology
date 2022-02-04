import { HCAdmin, Patient, PatientVaccine, VaccineBatch } from './ReportVac.model';
import { Injectable } from '@angular/core';
import { RecordVacAlertComponent } from './record_vac/record_vac_alert/recordVacAlert.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SelectCentre2 } from './view_vac/view_vac.model';

@Injectable({providedIn:'root'})

export class ReportVacService{
  private hcadminToken!: string;
  private patientToken!: string;

  private authPatient!: Patient;
  private patientID!: string;
  private hcadminID!: string;
  private patientvaccineID!: string;
  public countPending!: number;

  private invalidUserMsg = new Subject<string>();
  private authHcAdmin!: HCAdmin;
  private hcadminLoginStatus = new Subject<{isAuth:boolean,authHcAdmin:HCAdmin}>();
  private invalidPatientMsg = new Subject<string>();
  private patientLoginStatus = new Subject<boolean>();

  private vaccineBatchUpdated = new Subject<VaccineBatch[]>();
  private selectbatchnoUpdated = new Subject<VaccineBatch[]>();
  private pVaccineUpdated = new Subject<PatientVaccine[]>();
  private pendingsUpdated = new Subject<VaccineBatch[]>();

  vacID:number = 0;
  //patientID:number = 0;
  quantityAvailable: number=0;
  loginedUser: Patient = {
    patientID:'string',

    username:'string',
    password:'string',
    fullnameP:'string',
    email:'string',
    passport:'string',
    type:'string'
  }; //초기값 null의미는 아무것도 없다. null정보에서 patient 정보가 들어감

  constructor(private alert:RecordVacAlertComponent,private http:HttpClient, private router:Router){}
  public login2: boolean = true;

  private pendings: VaccineBatch[]=[];
  private pVaccine: PatientVaccine[] = [];
   private vaclists:VaccineBatch[]=[];
   private hcadminlists:HCAdmin[]=[
    //{hcAdminID:'h1',username:'1',password:'1',fullnameHC:'Lee',email:'lee@gmail',staffID:'st1',},
    {hcadminID:'h1',username:'1',password:'1',fullnameHC:'Lee',email:'lee@gmail',staffID:'st1',type:'HcAdmin',
    centreID:'cID'
  },
   ];
   private patientlists:Patient[]=[
    {
      patientID:'pid',
      username:'1',password:'1',fullnameP:'Lee',email:'lee@gmail',passport:'pas1',type:'Patient'},
   ];
   private patientvaclists:PatientVaccine[]=[];

   getVac(){
    return this.vaclists;
  }

  getVacID(){
    return this.vacID;
  }
  getNumOfPending(){
    return this.vaclists;
  }

  getCountTester(){
    return this.countPending;
  }

  getAuthHcAdminListener(){
    return this.hcadminLoginStatus;
  }

  getAuthHcAdmin(){
    return this.authHcAdmin;
  }

  getMergedList(){
    this.patientvaclists =  this.vaclists.map(
     ({ patientID: patientIDInPatientList, ...rest }) => {
       const result  = (this.patientlists.find(({ patientID }) => {
         return patientID === patientIDInPatientList
       }) as Patient)
       return {
         ...rest,
         ...result
       }
     }
   )
   return this.patientvaclists;
  }

  getMergedList2(){
    console.log('>>>>>>>')
    this.http.get<{message: string, patientVaccine: any}>
    ('http://localhost:3000/api/PCVS/managevac')
    // 'http://localhost:3000/api/PCVS/viewvac/'+this.patientID+'/'+vaccineBatchID
    //posts is type 'any' as in this point of time, the data in post model is not
    //the same with the back-end
    .pipe(map((batchdata)=>{
      console.log(batchdata)
      return batchdata.patientVaccine.map((item: any[])=>{
        const patient= item[0];
        const vaccineBatch = item[1];
        return{
          patientID: patient._id,
          //username: patient.username,
         //password: patient.password,
          fullnameP: patient.fullnameP,
          passport: patient.passport,
          batchNo: vaccineBatch.batchNo,
          vacID: vaccineBatch.vacID,
          expiryDate: vaccineBatch.expiryDate,
          quantityAvailable: vaccineBatch.quantityAvailable,
          status: vaccineBatch.status,
          appointmentDate: vaccineBatch.appointmentDate,
          manufactuer: vaccineBatch.manufactuer,
          vacName: vaccineBatch.vacName,
          remarks: vaccineBatch.remarks,
          vaccineBatchID: vaccineBatch._id,
        }
      })
    }))
      .subscribe((getvaclist)=>{
        this.pVaccine=getvaclist;
        this.pVaccineUpdated.next([...this.pVaccine]);
      })
  //pipe method - allows to add in operator Map accept argument (a function) - what to
  //perform on each element. Return the array of post by converting every post by
  //returning the new javascript obejct which has title, content and id.
  //name the new converted array(result of map operation)
  }
  onAddVacID2(vaccineBatchID: string){
        const patientID=this.patientID;
        this.http.post<{message:string, centre_id:string}>
            ('http://localhost:3000/api/PCVS/viewvac/'+this.patientID+'/'+vaccineBatchID,{})
            .subscribe(response =>{
                 console.log(response);
                 this.alert.createalert("Patient succeed to record new vaccination appointment!");
                 this.router.navigate(['/batchList']);
            })
    }

    getAddVac(){
      console.log('>>>>>>>')
      this.http.get<{message: string, vaccineBatch: any}>('http://localhost:3000/api/PCVS/vaccinebatch')
      //posts is type 'any' as in this point of time, the data in post model is not
      //the same with the back-end
      .pipe(map((batchdata)=>{
        return batchdata.vaccineBatch.map
        ((
          vaccine: {
            _id: any; vacID: any; batchNo: any; expiryDate: any;
            quantityAvailable: any; status: any;
           appointmentDate: any; manufactuer: any; vacName: any; remarks: any;
          }) =>{
          return{
            vaccineBatchID: vaccine._id,
            vacID: vaccine.vacID,
            batchNo: vaccine.batchNo,
            expiryDate: vaccine.expiryDate,
            quantityAvailable: vaccine.quantityAvailable,
            status: vaccine.status,
            appointmentDate: vaccine.appointmentDate,
            manufactuer: vaccine.manufactuer,
            vacName: vaccine.vacName,
            remarks: vaccine.remarks,
          };
        });
      }))
        .subscribe((getvaclist)=>{
          this.vaclists=getvaclist;
          this.countPending = getvaclist.length;
          this.vaccineBatchUpdated.next([...this.vaclists]);
        })
    //pipe method - allows to add in operator Map accept argument (a function) - what to
    //perform on each element. Return the array of post by converting every post by
    //returning the new javascript obejct which has title, content and id.
     //name the new converted array(result of map operation)
    }

    getVac2(){
      console.log('>>>>>>>')
      this.http.get<{message: string, vaccineBatch: any}>
      ('http://localhost:3000/api/PCVS/selectbatchno')
      //posts is type 'any' as in this point of time, the data in post model is not
      //the same with the back-end
      .pipe(map((selectbatchnodata)=>{
        return selectbatchnodata.vaccineBatch.map
        ((
          vaccine: {
            _id: any; vacID: any; batchNo: any; expiryDate: any;
            quantityAvailable: any; status: any;
           appointmentDate: any; manufactuer: any; vacName: any; remarks: any;
          }) =>{
          return{
            vaccineBatchID: vaccine._id,
            vacID: vaccine.vacID,
            batchNo: vaccine.batchNo,
            expiryDate: vaccine.expiryDate,
            quantityAvailable: vaccine.quantityAvailable,
            status: vaccine.status,
            appointmentDate: vaccine.appointmentDate,
            manufactuer: vaccine.manufactuer,
            vacName: vaccine.vacName,
            remarks: vaccine.remarks,
          };
        });
      }
      ))
        .subscribe((getvaclist)=>{
          this.vaclists=getvaclist;
          this.selectbatchnoUpdated.next([...this.vaclists]);
        })
    //pipe method - allows to add in operator Map accept argument (a function) - what to
    //perform on each element. Return the array of post by converting every post by
    //returning the new javascript obejct which has title, content and id.
     //name the new converted array(result of map operation)
    }

 checkUser(name: string,pwd:string){ //5
   const user = this.patientlists.find(({username, password})=>{ // 6
     return username === name && pwd === password
   })
   if(user){  //7
    this.alert.createalert("Succeed to login by Patient!");

    this.loginedUser = user; //user라는 값을 할당한다.

     return user // 8

   } else{
    this.alert.createalert("Invalid Patient username & password!");
     return 'Not found'
   }

 }
 checkHC(name: string,pwd:string){ //5
  const admin = this.hcadminlists.find(({username, password})=>{ // 6
    return username === name && pwd === password
  })
  if(admin){  //7
    return admin // 8

  } else{
    this.alert.createalert("Invalid Health Care Admin username & password!");
    return 'Not found'

  }
}

  //user login method
  loginHCAdmin(username:string, password:string){ //[1]. start
    console.log('hcadmin login....')
    //when user is login, pass the username and password to the server
    //for retrieving and checking user in the database
    this.http.post<{token:string, hcadmin:any}>(
        'http://localhost:3000/api/PCVS/hcadmin/login', //[2]. request
        {username,password}).subscribe(res=>{ //[5] response 로 결과값을 받는다. subscribe는 then과 같은 역할이다.
        console.log(res);
        this.invalidUserMsg.next('');//if user is success login, clear the error message
        //observable할때는 등록을 해놓고, .next할때는 다른 컴포넌트에 메시지 형식으로 전달.
        const token = res.token;//get token when user success to login
        const hcadmin = res.hcadmin;//pass the user data into a variable
        this.hcadminToken = token;//assign the token into property for storing token in the services
        this.authHcAdmin = hcadmin; //assign login user data into property
        this.hcadminID=hcadmin._id;//assign userid into property that will be used in many middleware url
        //                        //because user.model has not property to store the user id
        this.hcadminLoginStatus.next({isAuth:true,authHcAdmin:this.authHcAdmin});
        //isAuth property to true if the user is login successfully
        //authuser pass the authentication user data
        //pass these two varaible into the subject for calling them in another component
        //to check if user has register centre
        if(this.authHcAdmin.type == 'HcAdmin'){
          this.login2 = false;
          this.alert.createalert("Succeed to login by Health Care Admin!");
          this.router.navigate(['/infovac']);
      }
      },
      err => {
        this.alert.createalert("Fail to login by Health Care Admin!");
          console.log(err.error)
          //if user failed to login, pass the invalid message into this subject
          this.invalidUserMsg.next(err.error.message);
      }
    )
  }

  //user login method
  loginPatient(username:string, password:string){ //[1]. start
    console.log('patient login....')
    //when user is login, pass the username and password to the server
    //for retrieving and checking user in the database
    this.http.post<{token:string, patient:any}>(
        'http://localhost:3000/api/PCVS/patient/login', //[2]. request
        {username,password}).subscribe(res=>{ //[5] response 로 결과값을 받는다. subscribe는 then과 같은 역할이다.
        console.log(res);
        this.invalidPatientMsg.next(''); //if user is success login, clear the error message
        //observable할때는 등록을 해놓고, .next할때는 다른 컴포넌트에 메시지 형식으로 전달.
        const token = res.token;//get token when user success to login
        const patient = res.patient;//pass the user data into a variable
        this.patientToken = token;//assign the token into property for storing token in the services
        this.authPatient = patient;//assign login user data into property
        this.patientID=patient._id; //assign userid into property that will be used in many middleware url
        //                        //because user.model has not property to store the user id
        this.patientLoginStatus.next(true);
         //isAuth property to true if the user is login successfully
        //authuser pass the authentication user data
        //pass these two varaible into the subject for calling them in another component
        this.alert.createalert("Succeed to login by Patient!");
        //to check if user has register centre
        if(this.authPatient.type == 'Patient'){
          this.router.navigate(['/selectVacID2']);

      }
      },
      err => {
        this.alert.createalert("Fail to login by Patient!");
          console.log(err.error)
          this.invalidPatientMsg.next(err.error.message);
         // this.alert.createalert("Fail to login by Patient!");
      }
    )
  }
  // getMergedList(){
  //    this.patientvaclists =  this.patientlists.map(
  //     ({ batchNo: batchNoInPatientList, ...rest }) => {
  //       const result  = (this.vaclists.find(({ batchNo }) => {
  //         return batchNo === batchNoInPatientList
  //       }) as VaccineBatch)
  //       return {
  //         ...rest,
  //         ...result
  //       }
  //     }
  //   )
  //   return this.patientvaclists;
  // }

  subtractQA(){
    this.quantityAvailable =this.quantityAvailable -1;
  }
  addVacID(){

    this.vacID =this.vacID +1;
  }
  addVac(vacID:string, batchNo:string, expiryDate:Date, quantityAvailable:number, status:string,
    appointmentDate:Date, manufactuer: string,
    vacName: string, remarks: string, patientID:string ){
      const hcadminID=this.hcadminID;
    const vaclist:VaccineBatch = {vacID:vacID, batchNo:batchNo, expiryDate:expiryDate,
      quantityAvailable:quantityAvailable, status:status,appointmentDate:appointmentDate,
      manufactuer:manufactuer, vacName:vacName,
      remarks: remarks, patientID, vaccineBatchID: ''};
    this.http.post<{message:string, vaccineBatchID:string}>
        ('http://localhost:3000/api/PCVS/'+this.hcadminID+'/vaccinebatch',vaclist)
        .subscribe(response =>{
            console.log(response.message);
            //get the responseData id and store in a variable
            //set the post.id with the id from responseData
            const id = response.vaccineBatchID;
            vaclist.vaccineBatchID=id;
            this.vaclists.push(vaclist); //push the new post into posts array
            this.vaccineBatchUpdated.next([...this.vaclists]);//include id in add post
            this.alert.createalert("Succeed to adding new Vaccine list!");
            //this.router.navigate(['/']);
        })
  }

  getPatientID(){
    return this.patientID;
  }

  addPatientID(){
    this.patientID =this.patientID +1;
  }

  addPatient2(username:string, password:string, fullnameP:string, email:string, passport:string, type:string){
    const patientlist: Patient = {patientID:'',username:username, password:password,
      fullnameP: fullnameP, email:email, passport:passport, type:type};
    this.http.post('http://localhost:3000/api/PCVS/patient/register',patientlist).subscribe(res=>{
        console.log(res);//response를 통해서 subscribe를 받음 post가 비동기고 비동기 끝나면 sbuscribe가 호출된다.
    })
    console.log(this.patientlists);
    this.alert.createalert("Succeed to adding new Patient ID!");
  }

  addHCAdmin(username:string, password:string, fullnameHC:string, email:string, staffID:string, type:string,
    ){
    const hcadminlist: HCAdmin = {username:username, password:password,
      fullnameHC:fullnameHC, email:email, staffID:staffID, type:type,
     centreID:'',hcadminID:'',
    };
      this.http.post<{message:string, hcadminId: string}>
      ('http://localhost:3000/api/PCVS/user/register/hcadmin',hcadminlist)
      .subscribe(res=>{
        console.log(res.message);//response를 통해서 subscribe를 받음 post가 비동기고 비동기 끝나면 sbuscribe가 호출된다.
        const centreID = res.hcadminId;
        hcadminlist.centreID=centreID;

      })
    this.alert.createalert("Succeed to adding new Health Care Admin ID!");
  }


  updateStatus(vaccineBatchID:string,status:string){
    console.log("To update status:");
    this.http.put<{message:string}>('http://localhost:3000/api/PCVS/updateStatus/',
    {vaccineBatchID,status}).subscribe(resultStatus=>{
        this.pVaccine.forEach(res=>{ //파라미터를 받는다(from res).
            console.log("updating status");
            res.status = status;
            console.log("Succeed to update the Status!");
            this.alert.createalert("Succeed to update the Status!");
        }); //콜백 함수);
    });
  }

  updateStatusA(vaccineBatchID:string,remarks:string){
    console.log("To update remarks:");
    this.http.put<{message:string}>('http://localhost:3000/api/PCVS/updateStatusA/',
    {vaccineBatchID,remarks,status:"administered"}).subscribe(resultStatusA=>{
        this.pVaccine.forEach(res=>{ //파라미터를 받는다(from res).
            console.log("updating remarks");
          res.status = "administered";
          res.remarks = remarks;
            console.log("Succeed to update the Status (Administered)!");
            this.alert.createalert("Succeed to update the Status (Administered)!");
        }); //콜백 함수);
    });
}

  updateDate(batchNo:string,appointmentDate:Date,){
    console.log("To update appointment Date:");
    this.http.put<{message:string}>('http://localhost:3000/api/PCVS/updateDate/',
    {batchNo,appointmentDate}).subscribe(resultDate=>{
        this.vaclists.forEach(res=>{ //파라미터를 받는다(from res).
          if(res.batchNo == batchNo){
            console.log("updating appointment Date");
            res.appointmentDate = appointmentDate;
            res.quantityAvailable = res.quantityAvailable-1;
            //res.quantityAvailable =this.quantityAvailable -1;
            console.log("succeed to updated appointment date");
            this.alert.createalert("Succeed to make the appointment date!");
          }
        }); //콜백 함수);
    });
  }

  getHcAdminToken(){
    return this.hcadminToken;
  }

  getPatientToken(){
    return this.patientToken;
  }

  getInvalidUserListener(){
    return this.invalidUserMsg.asObservable();
  }

  getHcAdminLoginStatusListener(){
    return this.hcadminLoginStatus.asObservable();
  }

  getPatientLoginStatusListener(){
    return this.patientLoginStatus.asObservable();
  }

  getVaccineBatchUpdatedListener(){
    return this.vaccineBatchUpdated.asObservable();
  }

  getSelectBatchNoListener(){
    return this.selectbatchnoUpdated.asObservable();
  }

  getPVaccineUpdatedListener(){ //TODO Q2
    return this.pVaccineUpdated.asObservable();
  }

  getPendingsUpdatedListener(){
    return this.pendingsUpdated.asObservable();
  }

  logout(){
    this.hcadminToken = "";
    this.patientToken = "";
    this.patientID = "";
    this.hcadminID = "";
    //this.authHcAdmin=null;
    this.patientLoginStatus.next(false);
    this.hcadminLoginStatus.next({isAuth:false,authHcAdmin:this.authHcAdmin});
    this.router.navigate(['/loginHC']);
  }

  logout2(){
    this.hcadminToken = "";
    this.patientToken = "";
    this.patientID = "";
    this.hcadminID = "";
    this.patientLoginStatus.next(false);
    this.hcadminLoginStatus.next({isAuth:false,authHcAdmin:this.authHcAdmin});
    this.router.navigate(['/batchList']);
  }


  deleteBat(vaccineBatchID: string) {
    this.http.delete('http://localhost:3000/api/PCVS/'+this.hcadminID+'/vaccinebatch/' + vaccineBatchID)
    .subscribe(()=> {
      console.log('Deleted')
      const deleting = this.vaclists.filter(vaclist => vaclist.vaccineBatchID !== vaccineBatchID)
        this.vaclists = deleting;
        this.selectbatchnoUpdated.next([...this.vaclists])
    });
  }

}

