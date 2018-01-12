import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { SearchResultsComponent } from '../../shared/shared';

// @Component({
//   template:  `
    // <div class="container">
    //   <h2>Search</h2>
    //   <!--Two way data binding is cool but not very efficient in this case. -->
    //   <input [(ngModel)]='query'>
    //   <search-results [query]='query'></search-results>
    // </div>
//   `,
// })

@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
}) 

export class SearchComponent implements OnInit {
  query: String;
  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.query = param['query'];
    });
  }
}
