import { Injectable, NgZone } from '@angular/core';
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
  constructor(private zone: NgZone) { }

  emitMessage(){
    this.messageSubject.next(this.messages);
  }

  saveMessage(){
    firebase.database().ref('/message').set(this.messages);
  }

  getMessage(){
    firebase.database().ref('/message')
      .on('value', (data) => {
        this.zone.run(() => {
          this.messages = data.val() ? Object.values(data.val()): [];
          this.emitMessage();
        });
      });
  }

  sendNewMessage(newMessage: Message){
    this.messages.push(newMessage);
    this.saveMessage();
    this.emitMessage();
  }
}
