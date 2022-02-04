import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector: 'update_login',
  templateUrl: 'update_login.component.html',
  styleUrls:['./update_login.component.css']
})

export class UpdateLoginComponent{
  constructor(public reportvacservice:ReportVacService,
    private router: Router,){

  }

  onAddLogin(form: NgForm){ //1

    if (form.invalid){ //2
      return;
    }
//3
    const result = this.reportvacservice.loginPatient(form.value.username, form.value.password); //4 //9
    // 10
    // if (result == 'Not found'){
    //   return;
    // }
    // else{
    //   return this.router.navigate(['/selectVacID2',{}]);
    // }
    // this.reportvacservice.addVac();

    form.resetForm(); //validation을 초기화
  }
}
