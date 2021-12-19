import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user-service';
import firebase from 'firebase/compat/app';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'firebase/compat/auth';
import { User } from './user.model';
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation/translation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User = {
    displayName: '',
    photoURL: '',
  };
  userLoad: boolean = false;
  userSubscription: Subscription;

  //edit mode variable :
  editMode: boolean = false;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private userService :UserService,
              private httpClient :HttpClient,
              private translationService :TranslationService) {
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
  }

  async initProfile(){
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
  }

  onCancel(){
    this.editMode = false;
  }

  onSave(){
    this.editMode = false;
  }


  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.userService.uploadFile(file,this.user).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.userService.updateProfile(this.user.displayName, url);
        this.userService.emitUser();
      }
    )
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  async onClick(){
    await this.userService.updateProfile('deffohn');
    // this.getUser();
  }


  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }


}
