import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selected: string;
  isAuth: boolean;
  constructor(private authService: AuthService,
              private router: Router) {
   }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) =>  this.isAuth = Boolean(user) 
    );
  }

  onSelect(name: string){
    this.selected= name;
  }
  
  onLogOut(){
    this.router.navigate(['/home']);
    this.authService.signOutUser();
  }

  

}
