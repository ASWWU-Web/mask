//This is here just for testing. It should eventually be put in a separate git repo
//or be bundled with a base ASWWU project.
import { NgModule, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';
import { Observable ,  Subscription } from 'rxjs';


import { environment } from '../../shared-ng/environments/environment';
import { CURRENT_YEAR } from "../config";
import { User } from "./user.model";

@Injectable()
export class RequestService {
  authUser: User;
  private isLoggedIn: boolean = false;

  private searchAllResults: any[] = [];


  private setCurrentUser(user: any): void {
    if (user.hasOwnProperty("wwuid") && user.wwuid) {
      this.authUser = new User(user);
      this.isLoggedIn = true;
    } else {
      this.authUser = undefined;
      this.isLoggedIn = false;
    }
  }

  /*
  * Verifies the login status of the current user.
  * Gets current user and sets it to authUser
  * Also returns the user object to the callback function.
  */
  verify(cb?: any): void {
    if (document.cookie.search("token=") !== -1) {
      this.verifyGet("verify", data => {
        //Log in the user
        let user = data.user || null;
        this.setCurrentUser(user);
        if (typeof cb == "function") cb(user);
      }, err => {
        //user in not logged in remove authUser.
        this.setCurrentUser({});
        if (typeof cb == "function") cb(null);
      });
    } else {
      this.authUser = undefined;
      this.isLoggedIn = false;
    }
  }


  constructor(private http: HttpClient) { }


  private createRequest(uri: string, contentType: string = "application/json"): any {
    let url = uri;
    if (!url.startsWith("http")) {
      url = environment.SERVER_URL;
      if (url.split('').pop() != '/' && uri[0] != '/') url += '/';
      url += uri;
    }

    let options = {
      headers: new HttpHeaders().set('Content-Type', contentType),
    };

    return { url: url, options: options };
  }

  /*
  * Seperate function to make get requests in the Verify function.
  * Use of the normal get function would cause an infinite loop.
  * */
  private verifyGet(uri: string, afterRequest, catchError): void {
    let req = this.createRequest(uri);
    this.http.get(req.url, req.options)
      .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }

  /*
  * Functions to make get and post requests
  * If a full url isn't specified, the default is aswwu.com/ and then the path given
  * */
  get(uri: string, afterRequest, catchError): void {
    let req = this.createRequest(uri);
    this.verify();
    //If the query is /search/all or /search/CURRRENT_YEAR use cached result.
    if(uri === "/search/all" || uri === "/search/" + CURRENT_YEAR + "/") {
      this.searchAll(afterRequest, catchError);
    } else {
      this.http.get(req.url, req.options)
        // .map(res => res.json())
        .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
        );
    }
  }

  post(uri: string, data: any, afterRequest, catchError): void {
    let body = JSON.stringify(data);
    this.verify();
    let req = this.createRequest(uri);
    this.http.post(req.url, body, req.options)
      .subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }

  private objToHttpParams(obj): HttpParams {
    let params: HttpParams = new HttpParams();
    for (var key of Object.keys(obj)) {
      if (typeof obj[key] == "string") {
        params = params.append(key, obj[key].replace(/\;/g, ","));
      } else {
        params = params.append(key, JSON.stringify(obj[key]));
      }
    }
    return params;
  }

  postxwww(uri: string, data: any, afterRequest, catchError): void {
    let body = this.objToHttpParams(data);
    this.verify();
    let req = this.createRequest(uri, "application/x-www-form-urlencoded; charset=UTF-8");
    this.http.post(req.url, body.toString(), req.options).subscribe(
        data => afterRequest(data),
        err => (catchError ? catchError(err) : console.error(err))
      );
  }

  getWithSub(uri: string, afterRequest, catchError): Subscription {
    let req = this.createRequest(uri);
    this.verify();
    //If the query is /search/all or /search/CURRRENT_YEAR use cached result.
    if(uri === "/search/all" || uri === "/search/" + CURRENT_YEAR + "/") {
      return (this.searchAll(afterRequest, catchError));
    } else {
      let subscription = this.http.get(req.url, req.options)
        .subscribe(
          data => afterRequest(data),
          err => (catchError ? catchError(err) : console.error(err))
        );
      return (subscription);
    }
  }

  //This function returns the results for `/search/all`.
  // It also caches this result.
  searchAll(afterRequest, catchError): Subscription {
    if(this.searchAllResults.length == 0) {
      let req = this.createRequest('/search/all');
      this.verify();
      let subscription = this.http.get(req.url, req.options)
        .subscribe(
          data => {
            this.searchAllResults = data['results'];
            afterRequest(data);
          },
          err => (catchError ? catchError(err) : console.error(err))
        );
      return (subscription);
    } else {
      afterRequest({"results": this.searchAllResults});
      let sub = new Subscription();
      return (sub);
    }
  }
  /*
  * Function to view whether or not the user is logged in.
  * Not sure if needed.
  * TODO: see if we still need this function.
  * */
  isLoggedOn(): boolean {
    //Returns true if authUser is defined, false otherwise
    return this.isLoggedIn;
  }
}
