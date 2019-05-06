import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MaskRequestService, AuthService } from '../../../shared-ng/services/services';
import { Profile } from '../../../shared-ng/interfaces/interfaces'


@Component({
  template:  `
    <h2>Home</h2>

    <div *ngFor="let student of test"> {{student.email | unescape}}</div>
  `,
  providers: [CommonModule]
})

export class HomeComponent {

  //For testing purposes.
  test: any;
  constructor(private mrs: MaskRequestService, private as: AuthService) {
    //requestService.test().then((data: any) => {this.test = data});
    const profileObservable = this.mrs.listProfile();
    profileObservable.subscribe(
      (results: Profile[]) => {
        this.test = results;
      }, (err) => {
        window.alert('Unable to fetch data for profiles' + err.error.status);
      }
    );

    // requestService.post('/login', 'hello', (data) => {console.log("postData",data);},null);

    this.as.authenticateUser().subscribe((data) => {console.log(data)});
  }
}
