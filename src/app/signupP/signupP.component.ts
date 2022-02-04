import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportVacService } from '../ReportVac.service';

@Component({
  selector: 'signupP',
  templateUrl: './signupP.component.html',
  styleUrls: ['./signupP.component.css']
})

export class SignupPComponent{



  constructor(public reportvacservice:ReportVacService,){

  }

  onAddPatient(form: NgForm){
    if (form.invalid){
      return;
    }
// const now = new Date();
// now.setMonth(new Date().getMonth()+1)
    // this.reportvacservice.addPatientID();
    this.reportvacservice.addPatient2(
      //this.reportvacservice.getPatientID()+'' ,
      form.value.username,
      form.value.password,
      form.value.fullnameP,
      form.value.email,
      form.value.passport,
      "Patient",
      );

    form.resetForm();
  }
}

