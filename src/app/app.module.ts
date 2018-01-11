import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule }  from '@angular/router';


import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  	HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([])
  ],
  providers: [
  	RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
