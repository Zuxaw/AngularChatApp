import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/translation/translation.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})


export class MessageComponent implements OnInit, OnDestroy{
  
  messages: Message[];
  currentMessages: any[];
  messageSubscription: Subscription;
  languageSubscription: Subscription;
  loadMessages: Boolean = true;
  messageRecieved: Boolean = true;

  constructor(private messageService: MessageService,
              private router: Router,
              public translationService: TranslationService) { 
    
  }

  ngOnInit(): void {
    //On new message
    this.messageSubscription = this.messageService.messageSubject.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        if(this.loadMessages){
          this.currentMessages = JSON.parse(JSON.stringify(this.messages));
          this.loadMessages = false;
        }else{      
          if(this.messageRecieved){
            this.currentMessages.push(messages[messages.length-1])
          }
          this.messageRecieved = !this.messageRecieved;
        }
        this.translationService.onTranslateMessage(this.messages,this.currentMessages);
      }
    );
    this.messageService.getMessage();
    

    //When we change of language
    this.languageSubscription = this.translationService.current_language_change.subscribe(
      (value) => {
        this.translationService.onTranslatePage(this.messages,this.currentMessages);
      }
    )
  }

  ngOnDestroy(): void {
      this.messageSubscription.unsubscribe();
  }

}
