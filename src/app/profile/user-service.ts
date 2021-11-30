import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = {
    displayName: undefined,
    photoURL: undefined
  };
  userSubject = new Subject<User>();

  emitUser(){
    this.userSubject.next(this.user);
  }

  getUserPhoto(){
    return firebase.auth().currentUser.photoURL;
  }


  getUser (){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.user = user;
        this.emitUser();
      }
    });
  }

  async updateProfile(name?: string, photoURL?: string){
    let user: User;
    await firebase.auth().currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL,
    })
    
  }
}
