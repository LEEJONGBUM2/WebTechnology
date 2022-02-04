import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { VaccineBatch } from '../ReportVac.model';
import { ReportVacService } from '../ReportVac.service';
import { VacCentre } from '../vac_centre/vac_centre.model';
import { VacCentreService } from '../vac_centre/vac_centre.service';


@Component({
  selector: 'app-loginHC',
  templateUrl: './loginHC.component.html',
  styleUrls: ['./loginHC.component.css']
})
export class LoginHCComponent{
  storedVacs: VaccineBatch[] = [];
  currentRoute: string;

  onPostAdded(vaccine: VaccineBatch){
    this.storedVacs.push(vaccine);
  }
  title = 'PCVS';
  cenName!: VacCentre[];
  // centre;
  constructor(
    private router: Router,public getName:VacCentreService,
    public reportvacservice:ReportVacService,
  ) {
      this.currentRoute = "";
      this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
              // Hide loading indicator
              this.currentRoute = event.url;
              console.log('>>event',event)
              if(this.currentRoute == '/signupHC'){
                this.login2 = false;
              }else if(this.currentRoute.includes('/vaccinebatch')){
                this.login2 = false;
              }
                console.log(event);
          }
      });

  }
  public login2: boolean = true;
  private loginSub!: Subscription;
  loginMessage!: string;

  ngOnInit(){
    this.cenName = this.getName.getName();
    this.loginSub = this.reportvacservice.getInvalidUserListener().subscribe(msg=>{
      this.loginMessage=msg;
      console.log(msg)
    })
}

  ClickSignup(): void {
    this.login2 = false;
    this.router.navigate(['/signupHC',{}]);
  };

  ClickLogin(form: NgForm): void{

    if (form.invalid){ //2
      return;
    }
  //3
     const result = this.reportvacservice.loginHCAdmin(form.value.username, form.value.password);
    // 10
    this.login2 = false;
    this.loginMessage='';
  };

  ClickReqVac(): void {
    this.login2 = false;
    this.router.navigate(['/requestVac',{}]);
  };
}

