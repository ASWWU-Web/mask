import { Component, NgModule, OnInit } from '@angular/core';
import { Routes, Router } from "@angular/router";
import { Location } from "@angular/common";
import { HermesService } from '../shared-ng/services/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.styles.css']
})

export class AppComponent {
  fade: number = 1;

  constructor(
      private loc: Location,
      private router: Router,
      private hermes: HermesService
  ) {
      this.router.events.subscribe(() => {
        this.fade = 2;

        // fade in/out background for profiles
        if(this.loc.path().search('profile') != -1) this.fade = 1;
        else if(this.loc.path().search('update') != -1) this.fade = 1;
        else if(this.loc.path().search('random') != -1) this.fade = 1;
    });
    this.hermes.sendHeaderTitle('The Mask');
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
