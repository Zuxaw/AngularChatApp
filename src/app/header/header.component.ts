import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Router } from '@angular/router';

// begin translation imports
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
// end translation imports

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selected: string;
  isAuth: boolean;

  // language settings variables /begins
  language_selected = false;

  // language settings variables /ends

  // begin translation variables
  pageText = [
    {key : "home", text :
    "Home"},
    {key : "language", text :
    "Language"},
    {key : "profile", text :
    "Profile"},
    {key : "chat", text :
    "Chat"},
    {key : "signIn", text :
    "Sign In"},
    {key : "signUp", text :
    "Sign Up"},
    {key : "logOut", text :
    "Log Out"}
  ]

  currentPageText = this.pageText;
  languageSubscription: Subscription;
  // end translation variables


  constructor(private authService: AuthService,
              private router: Router,
              private translationService: TranslationService) {
   }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) =>  this.isAuth = Boolean(user)
    );
    // begin translation subscription
    this.languageSubscription = this.translationService.current_language_change.subscribe(
      (value) => {
        this.translationService.onTranslatePage(this.pageText,this.currentPageText)
      }
    )
    // end translation subscription
  }

  // begin translation functions
  getTextForTranslation(key: string){
    return this.currentPageText.find(currentPageText => currentPageText.key === key).text
  }
  // end translation functions

  onSelect(name: string){
    if(this.language_selected && name === "language"){
      this.selected= null;
    }else{
      this.selected= name;
    }
  }

  onSelectLanguage(){
    this.language_selected = !this.language_selected;
  }

  onLogOut(){
    this.router.navigate(['/home']);
    this.authService.signOutUser();
  }



}
