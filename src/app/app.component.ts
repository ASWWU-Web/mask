// import { Component } from '@angular/core';
// import { RequestService } from './RequestService/requests';
// import { Subscription } from 'rxjs';
// import { ActivatedRoute, Params } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   private subscription: Subscription;
//   private data;
//   constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute) {}

//   title = 'app';
//   ngOnInit() {
//     this.subscription = this.activatedRoute.params.subscribe(
//     (param: any) => {
//       this.requestService.get("/search/all", (data) => {this.data = data; console.log(data);}, undefined);
//     });
//   }
// }

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
    styles: ['#background {\n' +
    '  position: fixed;\n' +
    '  top: 0;\n' +
    '  left: 0;\n' +
    '  right: 0;\n' +
    '  bottom: 0;\n' +
    '  background-color: #222;\n' +
    '  z-index: -1;\n' +
    '  overflow: hidden;\n' +
    '  background-position: center;\n' +
    '  background-size: cover;\n' +
    '  background-image: url(https://aswwu.com/media/background.php);' +
    '  -webkit-transition: -webkit-filter 300ms;\n' +
    '  -moz-transition: -moz-filter 300ms;\n' +
    '  -o-transition: -o-filter 300ms;\n' +
    '  transition: -webkit-filter 500ms, filter 500ms;' +
    '}\n' +
    '#background.fade4 {\n' +
    '  -webkit-filter: saturate(0%) brightness(100%);\n' +
    '  -moz-filter: saturate(0%) brightness(100%);\n' +
    '  -o-filter: saturate(0%) brightness(100%);\n' +
    '  filter: saturate(0%) brightness(100%);\n' +
    '}\n' +
    '#background.fade3 {\n' +
    '  -webkit-filter: saturate(0%) brightness(70%);\n' +
    '  -moz-filter: saturate(0%) brightness(70%);\n' +
    '  -o-filter: saturate(0%) brightness(70%);\n' +
    '  filter: saturate(0%) brightness(70%);\n' +
    '}\n' +
    '#background.fade2 {\n' +
    '  -webkit-filter: saturate(0%) brightness(40%);\n' +
    '  -moz-filter: saturate(0%) brightness(40%);\n' +
    '  -o-filter: saturate(0%) brightness(40%);\n' +
    '  filter: saturate(0%) brightness(40%);\n' +
    '}\n' +
    '#background.fade1 {\n' +
    '  -webkit-filter: saturate(0%) brightness(10%);\n' +
    '  -moz-filter: saturate(0%) brightness(10%);\n' +
    '  -o-filter: saturate(0%) brightness(10%);\n' +
    '  filter: saturate(0%) brightness(10%);\n' +
    '}']
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
