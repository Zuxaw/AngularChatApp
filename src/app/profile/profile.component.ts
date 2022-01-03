import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user-service';
import firebase from 'firebase/compat/app';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'firebase/compat/auth';
import { User } from './user.model';

// begin translation imports
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
// end translation imports

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  file: File;
  user: User;
  userLoad: boolean = false;
  userSubscription: Subscription;
  isVisible: boolean = true;

  // begin translation variables
  pageText = [
    {key : "userProfile", text :
    "User Profile"},
    {key : "uploadNewPicture", text :
    "Upload a new profile picture"},
    {key : "username", text :
    "Username"},
    {key : "edit", text :
    "Edit"},
    {key : "save", text :
    "Save"},
    {key : "cancel", text :
    "Cancel"}
  ]

  currentPageText = this.pageText;
  languageSubscription: Subscription;
  // end translation variables

  //edit mode variable :
  editMode: boolean = false;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private userService :UserService,
              private httpClient :HttpClient,
              private translationService :TranslationService) {
                setTimeout(
                  () => {
                    this.isVisible = true;
                  }, 4000
                );

  }



  ngOnInit(){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        //Useful for the first connexion
        if (!user.displayName){
          this.editMode = true;
        }
      }
    });
    this.initProfile()

    // begin translation subscription
    this.languageSubscription = this.translationService.current_language_change.subscribe(
      (value) => {
        this.translationService.onTranslatePage(this.pageText,this.currentPageText)
      }
    )
    // end translation subscription
  }

  initProfile(){
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: User) => {
        this.userLoad = true;
        this.user = user;
      }
    )
    this.userService.getUser();
    this.userService.emitUser();
  }

  onEdit(){
    this.editMode = !this.editMode
    var visible = document.getElementById("hideDiv");
    if (visible.style.visibility === "visible") {
      visible.style.visibility = "hidden";
    } else {
      visible.style.display = "hidden"
        setTimeout(() => {visible.style.visibility = "hidden", 4000})
    }
  }

  onCancel(){
    this.editMode = false;
  }

  onSubmit(form: NgForm){
    if(this.file){
      this.onUploadFile(this.file);
    }
    this.userService.updateProfile(form.value['username']);
    this.editMode = false;
  }


  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.userService.uploadFile(file,this.user).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.userService.updateProfile(this.user.displayName , url);
        this.userService.emitUser();
      }
    )
  }

  detectFiles(event) {
    this.file = event.target.files[0];
    this.fileUploaded = true;
    // this.onUploadFile(event.target.files[0]);
  }

  async onClick(){
    await this.userService.updateProfile('deffohn');
    // this.getUser();
  }


  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  // begin translation functions
  getTextForTranslation(key: string){
    return this.currentPageText.find(currentPageText => currentPageText.key === key).text
  }
  // end translation functions


}
