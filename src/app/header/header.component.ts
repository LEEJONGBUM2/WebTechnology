import { Component, OnInit } from "@angular/core";
import { ReportVacService } from "../ReportVac.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{ //Add property(authListenerSubs from the subscription)
  userIsAuthenticated1 = false;
  userIsAuthenticated2 = false;
  private authListenerSubs!: Subscription;
  constructor(private hcAdmin: ReportVacService, private router: Router,private patient: ReportVacService) {} // Add service
  public login2: boolean = true;

  ngOnInit(){
    this.authListenerSubs = this.hcAdmin //Get the subscribe through the subscrition set up in service
    .getHcAdminLoginStatusListener()
    .subscribe(hcadminLoginStatus =>{ //Set the result from service to the property in component
      this.userIsAuthenticated1 = hcadminLoginStatus.isAuth;
    })
    this.authListenerSubs = this.patient
    .getPatientLoginStatusListener()
    .subscribe(isAuthenticated2 =>{ //Set the result from service to the property in component
      this.userIsAuthenticated2 = isAuthenticated2;
    })
  }

  ClickSignup(){
    this.login2 = false;
    this.router.navigate(['/signupHC',{}]);
  };

  onLogout() {
    this.hcAdmin.logout();
    this.patient.logout();
  }


}
