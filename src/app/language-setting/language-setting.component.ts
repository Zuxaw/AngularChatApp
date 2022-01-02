import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../translation/translation.service';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss']
})
export class LanguageSettingComponent implements OnInit {

  languages = [];

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {

    this.languages = this.translationService.getLanguages();

  }

  updateLanguage(lang: string){
    this.translationService.setCurrentLanguage(lang);
  }

}
