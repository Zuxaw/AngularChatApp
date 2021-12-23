import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../profile/user-service';
import { User } from '../profile/user.model';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  // User section
  user: User;
  userSubscription: Subscription;

  //Message section
  msgArea: string = '';
  msg: Message = {
    displayName: '',
    text:'',
  }

  constructor(private messageService: MessageService,
              private userService :UserService) { }

  ngOnInit(): void {
    this.initProfile();
  }

  initProfile(){
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
    this.userService.getUser();
    this.userService.emitUser();
  }

  initMessage(){
    if(this.user.displayName){
      this.msg.createdAt = (new Date).toString();
      this.msg.displayName = this.user.displayName;
      this.msg.email = this.user.email;
      this.msg.photoURL = this.user.photoURL;
    }else {
      console.log("error: You need to logOut and logIn again")
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.initMessage();
    this.msg.text = this.msgArea;
    if(this.msg.text != ''){
      this.messageService.sendNewMessage(this.msg);
    }
    this.msgArea = '';
  }

  handleKeyUp(e){
     if(e.keyCode === 13){
        this.handleSubmit(e);
     }
  }

  

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
