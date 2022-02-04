import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector: 'select_batch',
  templateUrl: './select_batch.component.html',
  styleUrls: ['./select_batch.component.css']
})

export class SelectBatchComponent implements OnInit{
  vaclists: VaccineBatch[] = [];
  private reportvacSub!: Subscription;

  constructor(public reportvacservice:ReportVacService) {}

  ngOnInit(){
    //this.vaclists=this.reportvacservice.getVac();
    this.reportvacservice.getVac2();
    this.reportvacSub =
     this.reportvacservice.getSelectBatchNoListener().subscribe(vaclists=>{
    this.vaclists=vaclists;
    console.log(this.vaclists);
  })
  }

  onDelete(vaccineBatchID: string) {
    this.reportvacservice.deleteBat(vaccineBatchID);
  }

}

