import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthenticatedResponse{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }
  authenticate(user:any){
    return this.http.post<AuthenticatedResponse>("http://localhost:9070/login", user, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
  }

  logOut = () => {
    localStorage.removeItem("jwt");
  }
}
