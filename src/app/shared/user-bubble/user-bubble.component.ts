/**
 * Created by ethan on 3/7/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../RequestService/requests';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../config';

@Component({
    selector: 'user-bubble',
    template: `<div *ngIf="isLoggedIn" class="contain">
                    <div ngbDropdown id="bubble-popup">
                        <button id="bubbleicon" ngbDropdownToggle>
                            <div *ngIf="(profile?.photo == 'images/mask_unknown.png' || profile?.photo == 'None' || !profile?.photo)" (click)="displayUserOptions()" class="btn btn-default btn-circle">{{profile?.username.charAt(0).toUpperCase()}}</div>
                            <img *ngIf="!(profile?.photo == 'images/mask_unknown.png' || profile?.photo == 'None' || !profile?.photo)" (click)="displayUserOptions()" class="btn btn-default btn-circle" src="{{getPhotoLink(profile.photo)}}">
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bubbleicon">
                            <button class="btn btn-default dropdown-item" [routerLink]="['/profile/'+profile?.username]">View Profile</button>
                            <button class="btn btn-default dropdown-item" [routerLink]="['/update']">Update Profile</button>
                            <div class="dropdown-divider"></div>
                            <button class="btn btn-default dropdown-item" (click)="logout()" [routerLink]="'/'">Log Out</button>
                        </div>
                    </div>
               </div>
               <a *ngIf="!isLoggedIn" class="btn btn-primary float-right" [href]="'https://saml.aswwu.com/?redirectURI=/mask'+ router.url">Log in</a>
`,
    styleUrls: ["user-bubble.css"],
    providers: [
        RequestService,
    ],
})


export class UserBubbleComponent implements OnInit {
    profile: any;
    router: any;
    isLoggedIn: boolean = false;

    constructor(private requestService: RequestService, private _router: Router) {
        this.router = _router;
    }

    ngOnInit() {
        this.requestService.verify((data) => {
            this.profile = data;
            this.isLoggedIn = this.requestService.isLoggedOn();
        });
    }

    current_year = CURRENT_YEAR;
    //Photourl to link funciton returns proper url and BLANK photo if photo == "None"
    getPhotoLink(url: string){
        if(url && url != "None"){
            return MEDIA_SM + "/" + url;
        } else {
            return MEDIA_SM + "/" + DEFAULT_PHOTO;
        }
    }

    displayUserOptions():void {
        // let popup = document.getElementById("bubble-popup");
        // popup.style.display = popup.style.display == 'none' ? 'block' : 'none';
    }

    logout():void {
        document.cookie="token=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.getElementById("bubble-popup").style.display = 'none';
        this.profile = undefined;
        this.requestService.verify();
        this.isLoggedIn = false;
    }
}
