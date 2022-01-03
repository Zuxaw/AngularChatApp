import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  languages = [] = [
    "FR",
    "EN-GB",
    "EN-US",
    "ES",
    "BG",
    "CS",
    "DA",
    "EL",
    "ET",
    "FI",
    "HU",
    "IT",
    "JA",
    "LT",
    "LV",
    "NL",
    "PL",
    "PT-BR",
    "PT-PT",
    "RO",
    "RU",
    "SK",
    "SL",
    "SV",
    "ZH",
    "DE",
  ];

  toTranslate?: string;

  default_language = "EN-GB";

  current_language = "FR"; // <-- temp because has to be linked with the profile setting on server

  current_language_change: Subject<string> = new Subject<string>();

  emitLanguage(){
    this.current_language_change.next(this.current_language);
  }

  constructor(private httpClient :HttpClient) { }


  fetchTranslation(translationText: string, targerLanguage: string){
    const deeplUrl = "https://api-free.deepl.com/v2/translate?auth_key=caf39346-bda1-c2ce-ad63-e3c9f540e0a4:fx"
    const body = new HttpParams()
      .set('auth_key','caf39346-bda1-c2ce-ad63-e3c9f540e0a4:fx')
      .set('text', translationText)
      .set('target_lang',targerLanguage);

    return this.httpClient.post(deeplUrl, null ,{params: body})
  }

  getLanguages(){
    return this.languages;
  }

  getCurrentLanguage(){
    return this.current_language;
  }

  setCurrentLanguage(lang: string){
    this.current_language = lang;
    this.emitLanguage();
  }

  onTranslate(pageText: any[], currentPageText: any[]){
    return new Promise ( resolve => {
      if(this.current_language !== this.default_language){
        pageText.forEach((elementText, index) => {
          this.fetchTranslation(elementText.text,this.current_language).subscribe({
            next : (response) => {
              resolve(currentPageText[index].text = Object.values(response)[0][0].text);
            },
            error : (error) => {
              console.log(error);
            }
          });
        });
      }
    });
  }

}
