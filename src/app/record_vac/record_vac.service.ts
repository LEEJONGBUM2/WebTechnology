import { SelectVac } from './record_vac.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})

export class RecordVacService {
  private selectVaccineUpdated = new Subject<SelectVac[]>();

  private vac: SelectVac[] = [
    // {vacID: 1, manufacturer:'Pfizer USA Laboratory', vacName: 'Pfizer'},
    // {vacID: 2, manufacturer:'AZ England Laboratory', vacName: 'AZ'},
    // {vacID: 3, manufacturer:'Sinovac China Laboratory', vacName: 'Sinovac'},
  ];

  constructor(private http:HttpClient,){}

  getVac(){
    return this.vac;
  }

  getSelectVac(){
    console.log('>>>>>>>')
    this.http.get<{message: string, vac: any}>('http://localhost:3000/api/PCVS/selectvac')
    .pipe(map((batchdata)=>{
      return batchdata.vac.map
      ((
        vaccine: {
          _id: any; vacID:any;  manufacturer: any; vacName: any;
        }) =>{
        return{
          vaccineID: vaccine._id,
          vacID: vaccine.vacID,
          manufacturer: vaccine.manufacturer,
          vacName: vaccine.vacName,
        };
      });
    }))
      .subscribe((getvaclist)=>{
        this.vac=getvaclist;
        this.selectVaccineUpdated.next([...this.vac]);
      })
  }

  getSelectVaccineUpdatedListener(){
    return this.selectVaccineUpdated.asObservable();
  }
}

