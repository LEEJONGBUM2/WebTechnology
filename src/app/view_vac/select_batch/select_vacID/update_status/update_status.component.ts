import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector: 'update_status',
  templateUrl: 'update_status.component.html',
  styleUrls:['./update_status.component.css']
})

export class UpdateStatusComponent implements OnInit {
  constructor(public reportvacservice:ReportVacService, private dialogRef:MatDialogRef<UpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public updatest: any) { }

  ngOnInit() { }

  onUpdateStatus(form:NgForm){
    if(form.invalid){
      return;
    }

    this.reportvacservice.updateStatus(this.updatest.avaccine.vaccineBatchID, form.value.status);
    this.dialogRef.close();
  }
}
