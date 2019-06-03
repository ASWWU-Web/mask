import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// shared-ng components
import {
  SharedNgContainerComponent,
  FooterComponent,
  NavBarComponent,
  MobileNavComponent,
  UserBubbleComponent,
  HeaderComponent,
  SearchBarComponent
} from '../shared-ng/components/components';
import {
  AuthService,
  RequestService,
  MaskRequestService,
  HermesService
} from '../shared-ng/services/services';

// project components
import {
  ProfileComponent,
  SearchComponent,
  UpdateComponent,
  RandomComponent,
  BirthdayComponent,
  SuperSearchComponent
} from './routes/routes';
import {
  ProfileFullComponent,
  ProfileSmComponent,
  SearchResultsComponent,
  SubNavBarComponent,
  UnescapePipe,
  ProfileModalComponent,
  ProfileModalContentComponent
} from './shared/shared';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
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
    UserBubbleComponent,
    SubNavBarComponent,
    MobileNavComponent,
    UnescapePipe,
    SharedNgContainerComponent,
    FooterComponent,
    NavBarComponent,
    MobileNavComponent,
    UserBubbleComponent,
    HeaderComponent,
    ProfileModalComponent,
    ProfileModalContentComponent,
    SearchBarComponent
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
        "path": 'search',
        component: SearchComponent
      },
      {
        "path": 'search:query',
        component: SearchComponent
      },
      {
        "path": 'super-search',
        component: SuperSearchComponent
      },
      {
        "path":'super-search:query',
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
    AuthService,
    RequestService,
    MaskRequestService,
    HermesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileModalComponent,
    ProfileModalContentComponent
  ]
})
export class AppModule {}
