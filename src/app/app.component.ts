import {Component, NgModule, OnInit} from '@angular/core';
import { Routes, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  template:  `
      <nav-bar></nav-bar>
      <router-outlet></router-outlet>
      <div id="background" [class.fade1]="fade == 1" [class.fade2]="fade == 2" [class.fade3]="fade == 3" [class.fade4]="fade == 4"></div>
  `,
    styleUrls: ['app.styles.css']
})

export class AppComponent {
  fade: number = 1;

  constructor(
      private loc: Location,
      private router: Router,
  ) {
      this.router.events.subscribe(() => {
        this.fade = 2;

        // fade in/out background for profiles
        if(this.loc.path().search('profile') != -1) this.fade = 1;
        else if(this.loc.path().search('update') != -1) this.fade = 1;
        else if(this.loc.path().search('random') != -1) this.fade = 1;
    });
  }
}
