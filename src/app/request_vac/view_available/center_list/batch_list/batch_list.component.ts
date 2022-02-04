import { Component, OnInit } from '@angular/core';
import { VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';
import { MatDialog, } from '@angular/material/dialog';
import { UpdateDateComponent } from '../update_date/update_date.component';
import { UpdateLoginComponent } from '../update_login/update_login.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'select_batch',
  templateUrl: './batch_list.component.html',
  styleUrls: ['./batch_list.component.css']
})

export class BatchListComponent implements OnInit{
  vaclists: VaccineBatch[] = [];
  private reportvacserviceSub!: Subscription;

  constructor(public reportvacservice:ReportVacService,
    public dialog:MatDialog) {}

  ngOnInit(){
    this.vaclists=this.reportvacservice.getVac();
    this.reportvacservice.getAddVac();
    this.reportvacserviceSub =
     this.reportvacservice.getVaccineBatchUpdatedListener().subscribe(vaclists=>{
    this.vaclists=vaclists;
    console.log(this.vaclists);
  })
  }

  actingBatch(vaclist: any){
    this.dialog.open(UpdateDateComponent,{autoFocus:true,data:{avaccine2:vaclist}});
  }
  actingBatch2(){
    this.dialog.open(UpdateLoginComponent,{autoFocus:true,});
  }
}

