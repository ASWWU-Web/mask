import { Component } from '@angular/core';
import { RequestService } from './RequestService/requests';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private subscription: Subscription;
  private data;
  constructor(private requestService: RequestService, private activatedRoute: ActivatedRoute) {}

  title = 'app';
  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
    (param: any) => {
      this.requestService.get("/search/all", (data) => {this.data = data; console.log(data);}, undefined);
    });
  }
}
