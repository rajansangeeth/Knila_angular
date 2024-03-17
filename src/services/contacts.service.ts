import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ROUTES_CONSTANTS } from "src/constants/routes";
import { ContactModel } from "src/models/contact.model";

@Injectable({
  providedIn: "root"
})

export class ContactService {
  constructor(private http: HttpClient) {

  }

  getContacts(): Observable<any> {
    return this.http.get(`${ROUTES_CONSTANTS.API_URL}${ROUTES_CONSTANTS.CONTACTS_LIST}`);
  }

  getContact(id: string): Observable<any> {
    return this.http.get(`${ROUTES_CONSTANTS.API_URL}${ROUTES_CONSTANTS.CONTACT}/${id}`);
  }

  postContact(model: ContactModel): Observable<any> {
    return this.http.post(`${ROUTES_CONSTANTS.API_URL}${ROUTES_CONSTANTS.CONTACT}`, model);
  }

  updateContact(id: string, model: ContactModel): Observable<any> {
    return this.http.put(`${ROUTES_CONSTANTS.API_URL}${ROUTES_CONSTANTS.CONTACT}/${id}`, model);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${ROUTES_CONSTANTS.API_URL}${ROUTES_CONSTANTS.CONTACT}/${id}`);
  }
}
