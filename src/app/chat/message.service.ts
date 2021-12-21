import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; 

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages:Message[] = [];
  messageSubject = new Subject<Message[]>();
  constructor() { }

  emitMessage(){
    this.messageSubject.next(this.messages);
  }

  saveMessage(newMessage: Message){
    firebase.database().ref('/message').push(newMessage);
  }

  getMessage(){
    firebase.database().ref('/message')
      .on('value', (data) => {
        this.messages = data.val() ? data.val(): [];
        this.emitMessage();
      });
  }

  sendNewMessage(newMessage: Message){
    this.messages.push(newMessage);
    this.saveMessage(newMessage);
    this.emitMessage();
  }
}
