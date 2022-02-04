import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { VacCentreService } from '../vac_centre.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'centre-create',
  templateUrl: './centre-create.component.html',
  styleUrls: ['./centre-create.component.css']
})
export class CentreCreateComponent{
  constructor(public ServiceCentre:VacCentreService,
    private centreRef: MatDialogRef<CentreCreateComponent>){}

  //to creating Vaccination of Centre
  centreCreate(centreForm: NgForm){
    if(centreForm.invalid){
      return;
    }
    this.ServiceCentre.centreCreate(centreForm.value.centreName, "Damansara", "Pfizer");
    this.centreRef.close();
    centreForm.reset();
  }
}
