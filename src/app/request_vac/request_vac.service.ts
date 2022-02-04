import { Injectable } from '@angular/core';
import { SelectCentre } from './request_vac.model';


@Injectable({providedIn:'root'})

export class ViewVacService {
  private vac: SelectCentre[] = [
    // {centreID: 3, centreName:'Sunway', vacName: 'Pfizer',},
    // {centreID: 9, centreName:'Taylor', vacName: 'Sinovac',},
  ];


  getCentre(){
    return this.vac;
  }

}


