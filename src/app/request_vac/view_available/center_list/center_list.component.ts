import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VacCentre } from 'src/app/vac_centre/vac_centre.model';
import { VacCentreService } from 'src/app/vac_centre/vac_centre.service';


@Component({
  selector: 'centre-added',
  templateUrl: './center_list.component.html',
  styleUrls: ['./center_list.component.css']
})

export class CenterListomponent implements OnInit {
  cenName: VacCentre[] = [];

  private serviceSub!: Subscription;

  constructor(public Service:VacCentreService,

    ){};

  ngOnInit(){
    //this.cenName = this.Service.getName();
    this.Service.getName2();
    this.serviceSub = this.Service.getNameUpdatedListener().subscribe(cenName=>{
      this.cenName=cenName;
  })

  }
}
