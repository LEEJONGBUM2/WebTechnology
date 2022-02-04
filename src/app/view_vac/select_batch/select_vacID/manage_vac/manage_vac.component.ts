import { Component, OnInit } from '@angular/core';
import { PatientVaccine, VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';
import { MatDialog, } from '@angular/material/dialog';
import { UpdateStatusComponent } from '../update_status/update_status.component';
import { UpdateStatusAComponent } from '../update_statusA/update_statusA.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'smanage_vac',
  templateUrl: './manage_vac.component.html',
  styleUrls: ['./manage_vac.component.css']
})

export class ManageVacComponent implements OnInit{
  vaclists: PatientVaccine[] = [];
  //vaclists: VaccineBatch[] = [];
  private reportvacserviceSub!: Subscription;
  constructor(public reportvacservice:ReportVacService, public dialog:MatDialog) {}

  ngOnInit(){
    //this.vaclists=this.reportvacservice.getVac();
  //this.vaclists=this.reportvacservice.getMergedList(); //프론트엔드는 비동기가 없다.
   this.reportvacservice.getMergedList2();
   this.reportvacserviceSub =
   this.reportvacservice.getPVaccineUpdatedListener().subscribe(vaclists=>{ //TODO Q5
  this.vaclists=vaclists;
  console.log(this.vaclists);
})
    console.log(this.vaclists);
  }

  acting(vaclist: any){
    this.dialog.open(UpdateStatusComponent,{autoFocus:true,data:{avaccine:vaclist}});
  }

  actingA(vaclist: any){
    this.dialog.open(UpdateStatusAComponent,{autoFocus:true,data:{avaccine:vaclist}});
  }

}

