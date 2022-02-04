import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CentreCreateComponent } from '../centre-create/centre-create.component';
import { VacCentre } from "../vac_centre.model";
import { VacCentreService } from "../vac_centre.service";



@Component({
  selector: 'centre-added',
  templateUrl: './centre-added.component.html',
  styleUrls: ['./centre-added.component.css']
})
export class CentreAddedComponent implements OnInit {
  cenName: VacCentre[] = [];

  private serviceSub!: Subscription;

  constructor(public centreDialog: MatDialog, public Service:VacCentreService,
    ){};

  ngOnInit(){
     // this.cenName = this.Service.getName();
      this.Service.getName2();
      this.serviceSub = this.Service.getNameUpdatedListener().subscribe(cenName=>{
        this.cenName=cenName;
    })
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
