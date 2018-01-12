import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { RequestService } from './RequestService/requests';
import { ProfileComponent, HomeComponent, SearchComponent, UpdateComponent, RandomComponent, BirthdayComponent, SuperSearchComponent } from './routes/routes';
import { ProfileFullComponent, ProfileSmComponent, SearchResultsComponent, NavBarComponent, UserBubbleComponent } from './shared/shared';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ProfileComponent,
    ProfileFullComponent,
    ProfileSmComponent,
    UpdateComponent,
    SearchResultsComponent,
    RandomComponent,
    BirthdayComponent,
    SuperSearchComponent,
    NavBarComponent,
    UserBubbleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        "path": '',
        component: SearchComponent
      },
      {
        "path": 'search/:query',
        component: SearchComponent
      },
      {
        "path":'search',
        component: SuperSearchComponent
      },
      {
        "path": 'update',
        component: UpdateComponent
      },
      {
        "path": 'profile',
        component: ProfileComponent
      },
      {
        "path": 'profile/:username',
        component: ProfileComponent
      },
      {
        "path": 'profile/:username/:year',
        component: ProfileComponent
      },
      {
        "path": 'random',
        component: RandomComponent
      },
      {
        "path": 'birthdays',
        component: BirthdayComponent
      }
    ])
  ],
  providers: [
  	RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
