import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(private httpClient :HttpClient) { }


  fetchTranslation(translationText: string, targerLanguage: string){
    const deeplUrl = "https://api-free.deepl.com/v2/translate?auth_key=4040bb49-6220-b183-2f26-27ea76565147:fx"
    const body = new HttpParams()
      .set('auth_key','4040bb49-6220-b183-2f26-27ea76565147:fx')
      .set('text', translationText)
      .set('target_lang',targerLanguage);

    return this.httpClient.post(deeplUrl, null ,{params: body})
  }

  
  // onTranslate(){
  //   this.translationService.fetchTranslation(this.toTranslate,'RU').subscribe({
  //     next : (response) => {
  //       this.toTranslate = Object.values(response)[0][0].text;
  //     },
  //     error : (error) => {
  //       console.log(error);
  //     }
  //   })
  // }


}
