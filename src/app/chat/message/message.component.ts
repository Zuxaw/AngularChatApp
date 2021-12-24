import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})


export class MessageComponent implements OnInit, OnDestroy{
  
  messages: Message[];
  messageSubscription: Subscription;

  constructor(private messageService: MessageService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.messageSubscription = this.messageService.messageSubject.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    this.messageService.getMessage();
  }

  ngOnDestroy(): void {
      this.messageSubscription.unsubscribe();
  }

}
