import { Component, OnInit} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { VaccineBatch } from "src/app/ReportVac.model";

import { ReportVacService } from 'src/app/ReportVac.service';

@Component({
  selector:'select_BN',
  templateUrl:'./select_BN.component.html',
  styleUrls:['./select_BN.component.css']
})


export class SelectBNComponent implements OnInit{
  vaclists:VaccineBatch[]=[];

  lists:any[]=[];
  result:string = "none";

  constructor(public reportvacservice:ReportVacService, public dialog:MatDialog){}

  ngOnInit(){
    this.vaclists=this.reportvacservice.getVac();

    console.log(this.lists);
  }

}
