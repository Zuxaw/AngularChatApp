import { Component, OnInit } from '@angular/core';

// begin translation imports
import { Subscription } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
// end translation imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // begin translation variables
  pageText = [
    {key : "title", text :
    "Your place to chat"},
    {key : "welcomingText", text :
    "Where ever you are you can spend your time with your friends.\
    STKS Messenger allows you to get closer to your loved ones.\
    Our goal makes it easy to talk every day."},
    {key : "joinNow", text :
    "Join now"}
  ]

  currentPageText = JSON.parse(JSON.stringify(this.pageText));
  languageSubscription: Subscription;
  // end translation variables

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
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

}
