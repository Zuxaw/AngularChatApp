import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user-service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import { User } from './user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;

  constructor(private userService :UserService) { 
  }

  ngOnInit(){
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
    this.userService.getUser();
    this.userService.emitUser();
    // this.getUser()
  }

  async onClick(){
    await this.userService.updateProfile('deffohn');
    // this.getUser();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }


}
