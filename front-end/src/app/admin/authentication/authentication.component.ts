import { Component } from '@angular/core';

export interface User{
  username:string,
  password:string
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {

  user: User = {
    username: '',
    password: ''
  };

  onSubmit() {
    console.log(this.user);
  }
}
