/**
 * Created by ethan on 2/21/17.
 */
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../RequestService/requests';

import { ProfileModel } from '../../shared/shared';
import { CURRENT_YEAR } from '../../config';

@Component({
    template:  `
    <div class="container">
      <h2 class="text-white" style="margin-top: 40px">Random</h2>
      <button (click)="getRandom()" class="btn btn-primary">Get new random profile</button>
      <div style="margin-top: 40px">
          <profile-full [profile]='selectedProfile'></profile-full>
      </div>
    </div>
  `,
    providers: [
    ],
})

export class RandomComponent implements OnInit {
    allProfiles: any;
    selectedProfile: any;

    constructor(private requestService: RequestService) {}

    ngOnInit() {
        this.requestService.searchAll((data) => {
            this.allProfiles = data['results'];
            this.getRandom();
        }, undefined);
    }

    getRandom(): any {
        this.selectedProfile = this.allProfiles[Math.floor((Math.random() * (this.allProfiles.length - 1)) + 1)];
        while(this.selectedProfile['photo'] == "images/mask_unknown.png" || this.selectedProfile['photo'] == "None" || !this.selectedProfile['photo']) {
            this.selectedProfile = this.allProfiles[Math.floor((Math.random() * (this.allProfiles.length - 1)) + 1)];
        }
        this.requestService.get("/profile/"+ CURRENT_YEAR + "/" + this.selectedProfile['username'], (data) => this.selectedProfile = new ProfileModel(data), undefined);
    }

}
