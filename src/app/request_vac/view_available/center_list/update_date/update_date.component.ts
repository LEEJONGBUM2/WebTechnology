import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector: 'update_date',
  templateUrl: 'update_date.component.html',
  styleUrls:['./update_date.component.css']
})

export class UpdateDateComponent implements OnInit {
  constructor(public reportvacservice:ReportVacService, private dialogRef:MatDialogRef<UpdateDateComponent>,
    @Inject(MAT_DIALOG_DATA) public updateap: any) { }

  ngOnInit() { }

  onUpdateDate(form:NgForm){
    if(form.invalid){
      return;
    }

    this.reportvacservice.updateDate(this.updateap.avaccine2.batchNo, form.value.appointmentDate);
    this.dialogRef.close();
  }
}
