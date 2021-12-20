import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  languages = [] = [
    "FR",
    "EN-GB",
    "EN-US",
    "ES"

  ];

  toTranslate?: string;

  default_language = "EN-GB";

  current_language = "FR"; // <-- temp because has to be linked with the profile setting on server

  constructor(private httpClient :HttpClient) { }


  fetchTranslation(translationText: string, targerLanguage: string){
    const deeplUrl = "https://api-free.deepl.com/v2/translate?auth_key=4040bb49-6220-b183-2f26-27ea76565147:fx"
    const body = new HttpParams()
      .set('auth_key','4040bb49-6220-b183-2f26-27ea76565147:fx')
      .set('text', translationText)
      .set('target_lang',targerLanguage);

    return this.httpClient.post(deeplUrl, null ,{params: body})
  }

  getLanguages(){
    return this.languages;
  }

  setCurrentLanguage(lang: string){
    this.current_language = lang;
  }

  onTranslate(){
    if(this.current_language !== this.default_language){
      this.fetchTranslation(this.toTranslate,this.current_language).subscribe({
        next : (response) => {
          this.toTranslate = Object.values(response)[0][0].text;
        },
        error : (error) => {
          console.log(error);
        }
      })
    }
  }


}
