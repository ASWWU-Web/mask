import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CURRENT_YEAR } from '../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RequestService } from '../../RequestService/request.service';
import { SearchResultsComponent } from '../../shared/shared';
import { SearchableFields } from '../../shared/fields';


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
  typeaheadSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private rs: RequestService) {}

  ngOnInit() {
    //Get the Params from the URL.
    this.activatedRoute.params.subscribe(
      (param: any) => {
        this.typedQuery = param['query'];
        this.searchQuery = param['query'];

        // get all profile view info
        var query = this.typedQuery || ""; // Ensure that query is at least "".
        this.rs.get('/search/'+ CURRENT_YEAR + "/" + query , (data) => {
          this.allProfiles = data.results;
          this.setupTypeAhead();
        }, undefined)
    });

  }

  //Converts 'majors=Computer Engineering' to 'Major: Computer Engineering'
  typeaheadFormatter = (result: string) => {
    if(result.substr(0,7) == 'majors=') {
      return 'Major: ' + result.substr(7);
    } else if(result.substr(0,7) == 'minors=') {
      return 'Minor: ' + result.substr(7);
    }
    return result.substr(0);
  }

  // Calculate the possible typeaheads
  typeaheadSearch = (text$: Observable<string>) =>
    text$.distinctUntilChanged().map(
      term => term.length < 1 ? [] : this.typeaheadResults.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    );

  // Runs the search
  runSearch() {
    this.searchQuery = this.typedQuery;
  }

  // Sets the first result of typeahead to the typed text
  addFirstResult() {
    this.typeaheadResults[0] = this.typedQuery;
  }

  setupTypeAhead() {
    this.typeaheadResults.push('');
    // Add all profiles to typeahead options
    for(let profile of this.allProfiles) {
      this.typeaheadResults.push(profile['full_name']);
    }
    // Add all majors and minors to typeahead options
    for(let major of SearchableFields['majors']) {
      this.typeaheadResults.push('majors=' + major);
    }
    for(let minor of SearchableFields['minors']) {
      this.typeaheadResults.push('minors=' + minor);
    }
  }
}
