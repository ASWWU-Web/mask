import { Component } from '@angular/core';
import { RequestService } from './RequestService/requests';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private subscription: Subscription;
  private data;
  constructor(private requestService: RequestService) {}

  title = 'app';
  ngOnInit() {
    // this.subscription = this.activatedRoute.params.subscribe(
    // (param: any) => {
    //   this.requestService.get("/search/all", (data) => this.data = data, undefined);
    // });
    this.requestService.get("/search/all", (data) => {this.data = data; console.log(data);}, undefined);
  }
}
