import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ReportVacService } from '../ReportVac.service';
import { CentreCreateComponent } from '../vac_centre/centre-create/centre-create.component';
import { VacCentre } from '../vac_centre/vac_centre.model';
import { VacCentreService } from '../vac_centre/vac_centre.service';


@Component({
  selector: 'signupHC',
  templateUrl: './signupHC.component.html',
  styleUrls: ['./signupHC.component.css']
})

export class SignupHCComponent{
  cenName: VacCentre[] = [];
  private serviceSub!: Subscription;

  constructor(public reportvacservice:ReportVacService,
    public centreDialog: MatDialog, public Service:VacCentreService,
    ){};

  ngOnInit(){
    //this.cenName = this.Service.getName();
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
  onAddHC(form: NgForm){
    if (form.invalid){
      return;
    }
// const now = new Date();
// now.setMonth(new Date().getMonth()+1)

    this.reportvacservice.addHCAdmin(
      form.value.username,
      form.value.password,
      form.value.fullnameHC,
      form.value.email,
      form.value.staffID,
      "HcAdmin",
      );

    form.resetForm();
  }
}

