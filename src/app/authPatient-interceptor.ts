import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { ReportVacService } from './ReportVac.service';


@Injectable()
export class AuthPatientInterceptor implements HttpInterceptor {
    constructor(private reportVacService: ReportVacService){}

    intercept(req: HttpRequest<any>, next:HttpHandler){ //모든 클라이언트 request Header에 토큰을 넣는다. //토큰이 앞으로 어떻게 사용되는지?
        //Promise에 대해서
        const patientToken = this.reportVacService.getPatientToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization','Bearer ' + patientToken),
            //header의 값을 변경 시켯다.
        })
        return next.handle(authRequest); //차례를 넘긴다.
    }
}

//URL, http://localhost:3000/api/CTIS/
// method: GET,
//body,
//head, 부가정보
//authorization: Bearear dsafsfsdsafsdaf
//
//클라이언트에서 발생하는 HTTP REquest에 Header 부분에 authorization에 헤드 부분에 토큰을 추가 시켜준다.
