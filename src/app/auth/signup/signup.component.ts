import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

// begin translation imports
import { Subscription } from 'rxjs';
import { TranslationService } from '../../translation/translation.service';
// end translation imports

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../sign.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  // begin translation variables
  pageText = [
    {key : "createAccount", text :
    "Create your account"},
    {key : "welcomingText", text :
    "We're so excited to have you with us"},
    {key : "email", text :
    "Email"},
    {key : "password", text :
    "Password"},
    {key : "signUp", text :
    "Sign Up"},
    {key : "alreadyHaveAccount", text :
    "You already have an account ?"}
  ]

  currentPageText = JSON.parse(JSON.stringify(this.pageText));
  languageSubscription: Subscription;
  // end translation variables

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private translationService: TranslationService) { }

  ngOnInit(): void {
    this.initForm();
    this.translationService.onTranslatePage(this.pageText,this.currentPageText);
    // begin translation subscription
    this.languageSubscription = this.translationService.current_language_change.subscribe(
      (value) => {
        this.translationService.onTranslatePage(this.pageText,this.currentPageText)
      }
    )
    // end translation subscription

  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    })
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUser(email,password).then(
      ()=>{
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

  // begin translation functions
  getTextForTranslation(key: string){
    return this.currentPageText.find(currentPageText => currentPageText.key === key).text
  }
  // end translation functions

}
