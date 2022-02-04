import { SelectVac } from 'src/app/record_vac/record_vac.model';
import { Component, OnInit } from '@angular/core';
import {VaccineInfo} from 'src/app/record_vac/info-vac/info_vac.service';
import { RecordVacService } from 'src/app/record_vac/record_vac.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'request_vac',
  templateUrl: './request_vac.component.html',
  styleUrls: ['./request_vac.component.css']
})

export class RequestVacComponent implements OnInit {
  vaccines: SelectVac[] = [];
  private recordvacserviceSub!: Subscription;

  constructor(public vacInfo: VaccineInfo, public recordvacservice:RecordVacService) {}



  ngOnInit(){
    //this.selectVacs=this.recordvacservice.getVac();
    this.recordvacservice.getSelectVac();
    this.recordvacserviceSub =
    this.recordvacservice.getSelectVaccineUpdatedListener().subscribe(selectVacs=>{
   this.vaccines=selectVacs;
   console.log(this.vaccines);
 })
  }
}
