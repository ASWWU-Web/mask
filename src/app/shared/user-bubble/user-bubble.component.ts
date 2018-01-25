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
               <a *ngIf="!isLoggedIn" class="btn btn-primary" [href]="'https://saml.aswwu.com/?redirectURI=/mask'+ router.url">Log in</a>
`,
    styles: [`
        .contain {
            float: right;
            clear: none;
            width: 50px;
        }`,
        // image
        `.btn-circle {
            /*width: 50px;*/
            /*height: 50px;*/
            /*text-align: center;*/
            /*padding: 0;*/
            /*font-size: 24px;*/
            /*line-height: 1.42;*/
            /*border-radius: 25px;*/
            /*border-color: aqua;*/
            /*color: #336699;*/
            /*cursor: pointer;*/
            width: 50px;
            height: auto;
            text-align: center;
            padding: 0;
            font-size: 24px;
            line-height: 1.42;
            border: none;
            color: #336699;
            cursor: pointer;

        }`,
        // container
        `#bubbleicon {
            /*background-color: transparent;*/
            /*border: none;*/
            /*color: transparent;*/
            background-color: transparent;
            border: none;
            color: transparent;
            z-index: 1;
            border-radius: 50%;
            border: none;
            padding: 0;
            overflow: hidden;
            height: 50px;
            width: 50px;
        }`,
        `.dropdown-menu {
            width: 150px;
            position: absolute;
            /*left: -50px;*/
        }`,
//         `#bubble-popup{
//     display: none;
//     position: absolute;
//     background-color: white;
//     border: 1px solid #999999;
//     padding: 5px;
//     right: 50px;
// }`,


    ],
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
