import { Component, OnInit, ViewChild} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { VaccineBatch } from "src/app/ReportVac.model";
import { SelectVac } from "../../record_vac.model";
import { RecordVacService } from "../../record_vac.service";

@Component({
  selector:'select_vac',
  templateUrl:'./select_vac.component.html',
  styleUrls:['./select_vac.component.css']
})


export class SelectVacComponent implements OnInit{
  vaccineData!: MatTableDataSource<SelectVac>;
  tableColumns:String[] =['vacID','manufacturer','vacName'];



  vaclists:VaccineBatch[]=[];
  selectVacs:SelectVac[]=[];
  result:string = "none";
  private recordvacserviceSub!: Subscription;

  constructor(public recordvacservice:RecordVacService){}

  ngOnInit(){
    //this.selectVacs=this.recordvacservice.getVac();
    this.recordvacservice.getSelectVac();
    this.recordvacserviceSub =
    this.recordvacservice.getSelectVaccineUpdatedListener().subscribe(selectVacs=>{
   this.selectVacs=selectVacs;
   console.log(this.selectVacs);
this.vaccineData = new MatTableDataSource(this.selectVacs);
 })
  }


}
