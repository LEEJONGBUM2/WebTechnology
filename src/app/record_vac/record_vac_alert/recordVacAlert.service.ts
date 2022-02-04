import { Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn:'root'
})

export class RecordVacAlertComponent{
    constructor(public alert:MatSnackBar) { }

    config:MatSnackBarConfig = {
        duration:1000,
        panelClass: ['red-snackbar'],
        horizontalPosition:'right',
        verticalPosition:'top'
    }

    createalert(check: string){

      // this.config['panelClass']=['success', 'fail','bbbbbb'] //개발자 도구
        this.alert.open(check,'', this.config);
    }
}
