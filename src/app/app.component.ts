import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAkuJ5TH-HMZiQvIf6CDlAhfTDi28TyTGc",
      authDomain: "stksmessenger.firebaseapp.com",
      projectId: "stksmessenger",
      storageBucket: "stksmessenger.appspot.com",
      messagingSenderId: "538513952885",
      appId: "1:538513952885:web:732cc8292492924b5ba83c",
      measurementId: "G-49L9RG606J"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
