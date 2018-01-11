import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { RequestService } from './RequestService/requests';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  	HttpClientModule,
    BrowserModule
  ],
  providers: [
  	RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
