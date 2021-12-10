import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user-service';
import firebase from 'firebase/compat/app';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private deeplUrl = "https://api-free.deepl.com/v2/translate?auth_key=4040bb49-6220-b183-2f26-27ea76565147:fx"
  toTranslate = "Hello world"

  constructor(private userService :UserService,
              private httpClient :HttpClient) { 
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

  onTranslate(){

    const body = new HttpParams()
      .set('auth_key','4040bb49-6220-b183-2f26-27ea76565147:fx')
      .set('text', this.toTranslate)
      .set('target_lang','JA');

    this.httpClient
      .post(this.deeplUrl, null ,{params: body})
      .subscribe(
        (response) => {
          console.log(response)
          console.log(Object.values(response)[0][0].text);
          this.toTranslate = Object.values(response)[0][0].text;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }


}
