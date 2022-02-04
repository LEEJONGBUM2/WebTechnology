import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientVaccine, VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector: 'select_vacID',
  templateUrl: './select_vacID.component.html',
  styleUrls: ['./select_vacID.component.css']
})

export class SelectVacIDComponent implements OnInit{
// vaclists: VaccineBatch[] = [];
vaclists: PatientVaccine[] = [];
  constructor(public reportvacservice:ReportVacService,
    private patient: ReportVacService,
    private hcAdmin: ReportVacService,
    private router: Router,) {}

  ngOnInit(){
 //this.vaclists=this.reportvacservice.getVac();
   this.vaclists=this.reportvacservice.getMergedList();


    console.log(this.vaclists);
  }

  onLogout() {
    this.hcAdmin.logout();
    this.patient.logout();
    this.router.navigate(['/loginHC',{}]);
  }

  onDelete(vaccineBatchID: string) {
    this.reportvacservice.deleteBat(vaccineBatchID);
  }

}

