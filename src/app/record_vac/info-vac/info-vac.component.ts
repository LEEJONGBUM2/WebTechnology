import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HCAdmin } from 'src/app/ReportVac.model';
import { ReportVacService } from 'src/app/ReportVac.service';
import { VacCentre } from 'src/app/vac_centre/vac_centre.model';
import { VacCentreService } from 'src/app/vac_centre/vac_centre.service';

@Component({
  selector: 'info-vac',
  templateUrl: './info-vac.component.html',
  styleUrls: ['./info-vac.component.css']
})

export class InfoVacComponent{
  authHcAdmin!:HCAdmin;
  cenName: VacCentre[] = [];
  constructor(
    private router: Router,
    public Service:VacCentreService,
    private patient: ReportVacService,
    private hcAdmin: ReportVacService,
    public reportvacservice:ReportVacService,
  ) {}

  ngOnInit(){
    this.cenName = this.Service.getName();
    this.authHcAdmin = this.reportvacservice.getAuthHcAdmin();

  }
  onLogout() {
    this.hcAdmin.logout();
    this.patient.logout();
    this.router.navigate(['/loginHC',{}]);
  }
}

