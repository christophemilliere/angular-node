import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  decodedToken = null;
  isAdmin = false;
  constructor( private authService: AuthService) { }
  ngOnInit() {
    if(this.authService.userIsLoggedIn()) {
      const jjbToken = JSON.parse(window.localStorage.getItem('jbb-data'))
      this.decodedToken = this.authService.decodeTokent(jjbToken.token);
      console.log(this.decodedToken);
      if(this.decodedToken && this.decodedToken.role === 'admin'){
        this.isAdmin = true;
      }
    }
  }

}
