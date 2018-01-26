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
  query: string;
  results: any[] = [];
  typeaheadResults: string[] = [];
  private resultsSub: Subscription;
  typeaheadSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private rs: RequestService) {}

  ngOnInit() {
    // subscribe to router event
    this.resultsSub = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.query = param['query'];
    });
  }

  typeaheadSearch = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.typeaheadResults.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  updateTypeahead() {
    //Query the server and sort the results.
    if(this.typeaheadSub != null) {
      this.typeaheadSub.unsubscribe();
    }
    var query = this.query || "";
    this.typeaheadSub = this.rs.getWithSub('/search/'+ CURRENT_YEAR + "/" + query , (data) => {
      this.results = data.results.sort((p1,p2) => {
        if (p1.views == "None")
          p1.views = 0;
        if (p2.views == "None")
          p2.views = 0;
        return p2.views - p1.views;
      });
    }, undefined)
    this.typeaheadResults = [];
    for(let profile of this.results) {
      this.typeaheadResults.push(profile['full_name'])
    }
  }
}
