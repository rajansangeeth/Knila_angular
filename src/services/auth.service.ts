import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ROUTES_CONSTANTS } from "src/constants/routes";
import { LoginModel } from "src/models/login.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {

  }

  login(model: LoginModel): Observable<any> {
    return this.http.post<any>(`${ROUTES_CONSTANTS.API_URL}${ROUTES_CONSTANTS.LOGIN}`, model);
  }
}
