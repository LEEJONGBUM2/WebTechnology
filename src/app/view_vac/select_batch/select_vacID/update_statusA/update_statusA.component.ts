import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector: 'update_statusA',
  templateUrl: 'update_statusA.component.html',
  styleUrls:['./update_statusA.component.css']
})

export class UpdateStatusAComponent implements OnInit {
  constructor(public reportvacservice:ReportVacService, private dialogRef:MatDialogRef<UpdateStatusAComponent>,
    @Inject(MAT_DIALOG_DATA) public updatest: any) { }

  ngOnInit() { }

  onUpdateStatusA(form:NgForm){
    if(form.invalid){
      return;
    }

    this.reportvacservice.updateStatusA(this.updatest.avaccine.vaccineBatchID, form.value.remarks);
    console.log(form.value.remarks);
    this.dialogRef.close();
  }
}
