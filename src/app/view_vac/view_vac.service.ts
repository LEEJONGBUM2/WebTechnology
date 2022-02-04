import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectCentre2 } from './view_vac.model';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})

export class ViewVacService {
  private vac: SelectCentre2[] = [
    // {centreID: 3, centreName:'Sunway', vacName: 'Pfizer', numOfPending:3},
    // {centreID: 9, centreName:'Taylor', vacName: 'Sinovac',numOfPending:5},
  ];
  constructor(private http: HttpClient, private router: Router) {}


  getCentre(){
    return this.vac;
  }

}


