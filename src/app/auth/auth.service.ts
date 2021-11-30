import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { Observable } from 'rxjs';
import { User } from '../profile/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { 
  }

  async createNewUser(email: string, password: string){
    await firebase.auth().createUserWithEmailAndPassword(email,password);
  }

  async signInUser(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email,password);
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
