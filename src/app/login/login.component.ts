import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginUserName: string;
  loginPassword: string;


  constructor(private loginService: LoginService) {
    this.loginService.login();
   }

  ngOnInit() {
  }
}
