/**
 * Created by ethan on 2/21/17.
 */
import { Component, OnInit } from '@angular/core';
import { MaskRequestService } from '../../../shared-ng/services/services';
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

    constructor(private mrs: MaskRequestService) {}

    ngOnInit() {
      const profileObservable = this.mrs.listProfile();
      profileObservable.subscribe((data)=> {
        this.allProfiles = data;
        this.getRandom();
      }, undefined);
    }

    getRandom(): any {
        this.selectedProfile = this.allProfiles[Math.floor((Math.random() * (this.allProfiles.length - 1)) + 1)];
        while(this.selectedProfile['photo'] == "images/mask_unknown.png" || this.selectedProfile['photo'] == "None" || !this.selectedProfile['photo']) {
            this.selectedProfile = this.allProfiles[Math.floor((Math.random() * (this.allProfiles.length - 1)) + 1)];
        }
        const profileObservable = this.mrs.readProfile(CURRENT_YEAR, this.selectedProfile['username']);
        profileObservable.subscribe(data => {
          this.selectedProfile = new ProfileModel(data);
        }, undefined);
    }

}
