import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  register(formData) {
    this.authService.register(formData).subscribe(
      data => this.handleRegisterSucess(data),
      error => this.handleRegisterError(error)
    );
  }

  handleRegisterSucess(data) {
    console.log('handler register', data);
    this.router.navigate(['/']);
    // window.localStorage.setItem('jbb-data', JSON.stringify(data));
  }
  handleRegisterError(error) {
    console.log( error);
  }

}
