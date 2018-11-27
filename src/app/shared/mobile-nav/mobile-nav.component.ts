import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css']
})
export class MobileNavComponent {
  isCollapsed: boolean = true;

  constructor(private route: Router) {}

  pageRoute(linkParts: string[]) {
    this.route.navigate(linkParts);
    this.isCollapsed = true;
  }

}
