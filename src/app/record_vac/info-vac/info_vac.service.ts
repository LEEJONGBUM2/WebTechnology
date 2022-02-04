import { SelectVac } from 'src/app/record_vac/record_vac.model';

import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})

export class VaccineInfo {
  private vaccines: SelectVac[] = [];
  private vac: SelectVac[] = [
    // {vacID: 1, manufacturer:'Pfizer USA Laboratory', vacName: 'Pfizer'},
    // {vacID: 2, manufacturer:'AZ England Laboratory', vacName: 'AZ'},
    // {vacID: 3, manufacturer:'Sinovac China Laboratory', vacName: 'Sinovac.'},
  ];

getVac(){
  return this.vac;
}

getVaccines() {
  return this.vaccines;
}


}
