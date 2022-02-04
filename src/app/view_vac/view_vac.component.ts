import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { VaccineBatch } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';
import { CentreCreateComponent } from 'src/app/vac_centre/centre-create/centre-create.component';
import { VacCentre } from 'src/app/vac_centre/vac_centre.model';
import { VacCentreService } from 'src/app/vac_centre/vac_centre.service';
import { SelectCentre } from '../request_vac/request_vac.model';
import { ViewVacService } from '../request_vac/request_vac.service';





@Component({
  selector: 'view_vac',
  templateUrl: './view_vac.component.html',
  styleUrls: ['./view_vac.component.css']
})
export class ViewVacComponent implements OnInit {
  cenName: VacCentre[] = [];
  numOfPendings:number = 0;
  vaclists: VaccineBatch[] = [];
  centrelists: SelectCentre[] = [];
  vaccineData!: MatTableDataSource<SelectCentre>;
  tableColumns:String[] =['centreName','vacName','numOfPendings'];

  private ServiceSub!: Subscription;
  private reportvacSub!: Subscription;

  constructor(public centreDialog: MatDialog, public Service:VacCentreService,
    public reportvacservice:ReportVacService, public viewvacservice:ViewVacService,
    ){};

  ngOnInit(){
    //this.cenName = this.Service.getName();
    this.Service.getName3();
    this.ServiceSub =
     this.Service.getViewVaccineUpdatedListener().subscribe(centrelists=>{
    this.centrelists=centrelists;
    console.log(this.centrelists);

    this.reportvacservice.getAddVac();
    this.reportvacSub = this.reportvacservice.getVaccineBatchUpdatedListener().subscribe(()=>{
      this.numOfPendings = this.reportvacservice.countPending;
      //console.log(countPending);
      this.vaccineData = new MatTableDataSource(this.centrelists);
  })
  })
    //this.numOfPendings = this.reportvacservice.getNumOfPending().length;
    this.centrelists=this.viewvacservice.getCentre();

    console.log(this.centrelists);
  }

  //to open a dialog on Healthcare to creating Vaccination Centre
  RegDialog(){
    this.centreDialog.open(CentreCreateComponent,{
      width:'50%',
      autoFocus:false,
      disableClose:true
    });
  }
}

// vaccineData!: MatTableDataSource<SelectVac>;
// tableColumns:String[] =['vacID','manufacturer','vacName'];



// vaclists:VaccineBatch[]=[];
// selectVacs:SelectVac[]=[];
// result:string = "none";
// private recordvacserviceSub!: Subscription;

// constructor(public recordvacservice:RecordVacService){}

// ngOnInit(){
//   //this.selectVacs=this.recordvacservice.getVac();
//   this.recordvacservice.getSelectVac();
//   this.recordvacserviceSub =
//   this.recordvacservice.getSelectVaccineUpdatedListener().subscribe(selectVacs=>{
//  this.selectVacs=selectVacs;
//  console.log(this.selectVacs);
// this.vaccineData = new MatTableDataSource(this.selectVacs);
// })
// }


// }
