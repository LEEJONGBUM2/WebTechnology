import { VacCentre } from './vac_centre.model';
import { Injectable } from '@angular/core';
import { RecordVacAlertComponent } from '../record_vac/record_vac_alert/recordVacAlert.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { SelectCentre } from '../request_vac/request_vac.model';
import { SelectVac } from '../record_vac/record_vac.model';

@Injectable({providedIn:'root'})

export class VacCentreService {
  constructor(private alert:RecordVacAlertComponent, private http:HttpClient){}
  private hcAdminID!: string;
  private centre_id!: string;

  private checkCentre = new Subject<boolean>();
  private centreUpdated = new Subject<VacCentre[]>();
  private viewVaccineUpdated = new Subject<SelectCentre[]>();
  private cenName: VacCentre[] = [];
  private selectCentre: SelectCentre[] = [];

  getName(){
    return this.cenName;
  }

  getName2(){
    console.log('>>>>>>>')
    this.http.get<{message: string, vacCentre: any}>('http://localhost:3000/api/PCVS/vaccentre')
    //posts is type 'any' as in this point of time, the data in post model is not
    //the same with the back-end
    .pipe(map((centredata)=>{
      console.log(centredata)
      return centredata.vacCentre.map
      ((
        centre: {
          _id: any; centreName: any; centreAddress: any; vacName: any;
        }) =>{
        return{
          centreID: centre._id,
                    centreName: centre.centreName,
                    centreAddress: centre.centreAddress,
                    vacName: centre.vacName,
        };
      });
    }
    ))
      .subscribe((getcentre)=>{
        this.cenName=getcentre;
        this.centreUpdated.next([...this.cenName]);
      })
  }

  getName3(){
    console.log('>>>>>>>')
    this.http.get<{message: string, selectCentre: any}>('http://localhost:3000/api/PCVS/viewvac')
    .pipe(map((centredata)=>{
      console.log(centredata)
      return centredata.selectCentre.map
      ((
        vaccine2: {
          _id: any; centreName: any; vacName: any;
        }) =>{
        return{
          centreID: vaccine2._id,
                    centreName: vaccine2.centreName,
                    vacName: vaccine2.vacName,
        };
      });
    }
    ))
      .subscribe((getcentre)=>{
        this.selectCentre=getcentre;
        this.viewVaccineUpdated.next([...this.selectCentre]);
      })
  }

  centreCreate(centreName:string,centreAddress:string,vacName:string, ){
    const vacCentre:VacCentre = {centreName:centreName,
      centreAddress:centreAddress, vacName:vacName, centreID: ''};
    this.http.post<{message:string, centreID:string}>
        ('http://localhost:3000/api/PCVS/vaccentre',vacCentre)
        .subscribe(response =>{
            console.log(response.message);
            const id = response.centreID;
            vacCentre.centreID=id;
            this.cenName.push(vacCentre);
            this.centreUpdated.next([...this.cenName]);
            this.checkCentre.next(true);
        })
  }


        getNameUpdatedListener(){
          return this.centreUpdated.asObservable();
      }

      getCheckCentreListener(){
        return this.checkCentre.asObservable();//component 상에서 데이터를 주고 받을때
      }

      getViewVaccineUpdatedListener(){
        return this.viewVaccineUpdated.asObservable();
      }

}
