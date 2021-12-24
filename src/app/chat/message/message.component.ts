import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy,AfterViewInit{

  messages: Message[];
  messageSubscription: Subscription;

  constructor(private messageService: MessageService) { 
    
  }

  ngOnInit(): void {
    this.messageSubscription = this.messageService.messageSubject.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    this.messageService.getMessage();
    this.messageService.emitMessage();
  }

  ngAfterViewInit(): void {
    this.messageService.emitMessage();
  }

  ngOnDestroy(): void {
      this.messageSubscription.unsubscribe();
  }

}
