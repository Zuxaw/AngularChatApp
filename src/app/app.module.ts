import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './chat/message/message.component';
import { LanguageSettingComponent } from './language-setting/language-setting.component';
import { CommonModule } from '@angular/common';



const appRoutes: Routes= [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'home', component: HomeComponent},
  {path: 'chat',component: ChatComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'message',component: MessageComponent},
  {path: 'language-settings',component: LanguageSettingComponent},
  {path: ' ', redirectTo: 'home'},
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    ChatComponent,
    ProfileComponent,
    MessageComponent,
    LanguageSettingComponent
  ],
  imports: [

    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
