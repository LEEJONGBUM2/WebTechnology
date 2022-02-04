import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PatientVaccine, VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'select_vacID2',
  templateUrl: './select_vacID2.component.html',
  styleUrls: ['./select_vacID2.component.css']
})

export class SelectVacID2Component implements OnInit{
  vaclists: VaccineBatch[] = [];
  patientvaclists:PatientVaccine[]=[];
  private reportvacserviceSub!: Subscription;
  constructor(public reportvacservice:ReportVacService, private route: ActivatedRoute,
    private patient: ReportVacService) {}

  ngOnInit(){
   // this.vaclists=this.reportvacservice.getVac();
    this.reportvacservice.getAddVac();
    this.reportvacserviceSub =
     this.reportvacservice.getVaccineBatchUpdatedListener().subscribe(vaclists=>{
    this.vaclists=vaclists;
    console.log(this.vaclists);
  })

  this.route.snapshot.params['patientID']
  console.log(this.route.snapshot.params['patientID'])
  // this.route.queryParams.subscribe(params => {
  //   console.log('>>paramName', params)
  //   console.log('>>paramName', params['patientID'])
  // });
  }

  onAddVacID2(batchItem: VaccineBatch){

    console.log('batchItem',batchItem)
    this.reportvacservice.onAddVacID2(batchItem.vaccineBatchID)
  }

  onLogout() {
    this.patient.logout2();
  }
}
