import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface User{
  login:string,
  password:string
}
export interface AuthenticatedResponse{
  token: string;
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {
  invalidLogin!: boolean;
constructor(private authService :AuthenticationService, private router :Router){

}
  user: User = {
    login: '',
    password: ''
  };
  ngOnInit(){

  }
  onSubmit() {
    console.log(this.user);
    this.authService.authenticate(this.user).subscribe({
      next: (response: AuthenticatedResponse) => {
        const token = response.token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(["/AdminInterface"]);
      },
      error: (err) => this.invalidLogin = true
    })
  }
}
