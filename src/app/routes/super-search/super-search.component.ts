import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CURRENT_YEAR } from '../../config';

import {
    FieldsInOrder, SelectFields, SearchableFields,
    FieldsForSearching
} from '../../shared/fields';

@Component({
    templateUrl: 'super-search.component.html',
    styleUrls: ['super-search.component.css'],
})

export class SuperSearchComponent implements OnInit {
    criteria: string[][] = [];
    query: string = '';
    year: string = CURRENT_YEAR;
    fieldsInOrder: string[] = FieldsForSearching;
    selectables: any = SelectFields;
    searchables: any = SearchableFields;

    private subscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.query = param['query'];
            });
        this.criteria.push(['', '']);
        }

    updateQuery() {
        let tempstring = '';
        for(let value of this.criteria) {
            if(value[0] !== 'year' && value[1] != ''){
                tempstring += value[0] + "=" + value[1] + ";";
            }
            else if(value[0] == 'year') {
                this.year = value[1];
            }
        }
        tempstring.slice(0, -1);
        this.query = tempstring;
    }

    removeField(i){
        this.criteria.splice(i, 1);
        // let i = 0;
        // for(let pair of this.criteria) {
        //     if(pair[1].indexOf(search)){
        //         this.criteria.splice(i, 1);
        //     }
        //     i++;
        // }
    }
}
