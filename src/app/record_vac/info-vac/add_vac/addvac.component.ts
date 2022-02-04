import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector:'addvac-component',
  templateUrl:'./addvac.component.html',
  styleUrls:['./addvac.component.css']
})

export class AddVacComponent {
  vaccines:VaccineBatch[]=[];
  private reportvacserviceSub!: Subscription;

  constructor(public reportvacservice:ReportVacService, private http: HttpClient){

  }

  onAddVac(form: NgForm){
    if (form.invalid){
      return;
    }
// const now = new Date();
// now.setMonth(new Date().getMonth()+1)
// this.reportvacservice.addPatientID();
    this.reportvacservice.addVacID();
    this.reportvacservice.addVac(
      this.reportvacservice.getVacID()+'' ,
      form.value.batchNo,
      form.value.expiryDate,
      form.value.quantityAvailable,
      "pending",
      form.value.appointmentDate,
      "Pfizer USA laboratory",
      "Pfizer",
      "",
      this.reportvacservice.getPatientID()+'' ,);

    form.resetForm();
  }
}
