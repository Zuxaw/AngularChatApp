import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss']
})
export class LanguageSettingComponent implements OnInit {

  languages = [] = [
    "fr",
    "en-GB"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
