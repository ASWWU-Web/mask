import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CURRENT_YEAR } from '../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RequestService } from '../../RequestService/request.service';
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
  providers: [ RequestService ],
})

export class SearchComponent implements OnInit {
  typedQuery: string;
  searchQuery: string;
  allProfiles: any[] = [];
  typeaheadResults: string[] = [];
  resultsSub: Subscription;
  typeaheadSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private rs: RequestService) {}

  ngOnInit() {
    // subscribe to router event
    this.resultsSub = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.searchQuery = param['query'];
    });
    // get all profile view info
    var query = this.typedQuery || "";
    this.typeaheadSub = this.rs.getWithSub('/search/'+ CURRENT_YEAR + "/" + query , (data) => {
      this.allProfiles = data.results.sort((p1,p2) => {
        if (p1.views == "None")
          p1.views = 0;
        if (p2.views == "None")
          p2.views = 0;
        return p2.views - p1.views;
      });
      this.typeaheadResults.push('');
      for(let profile of this.allProfiles) {
        this.typeaheadResults.push(profile['full_name']);
      }
    }, undefined)
  }

  typeaheadSearch = (text$: Observable<string>) =>
    text$.distinctUntilChanged().map(
      term => term.length < 1 ? [] : this.typeaheadResults.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    );

  runSearch() {
    this.searchQuery = this.typedQuery;
  }

  addFirstResult() {
    this.typeaheadResults[0] = this.typedQuery;
  }
}
