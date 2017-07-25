import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(window.localStorage.getItem('jbb-data')) {
      console.log('localstorage');
      this.refreshFlags();
    }
  }

  refreshFlags() {
    this.isAuthenticated = true;
    this.welcomeMessage = 'Bienvenue';
  }
  login(user) {
    this.authService.login(user).subscribe(
      data => this.handleLoginSuccess(data),
      error => this.handleLoginError(error)
    );
  }
  handleLoginSuccess(data) {
    this.jbbData = data;
    this.refreshFlags();
    window.localStorage.setItem('jbb-data', JSON.stringify(data));
  }
  handleLoginError(error) {
    console.log('error =>', error);
  }
}
