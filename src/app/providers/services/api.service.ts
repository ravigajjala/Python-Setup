import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Location } from '../classes/plantInfo.class';

@Injectable()
export class ApiService {


	private headers = new Headers({ 'Content-Type': 'application/json' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http, public router: Router) { }


	getLocations(): Observable<Location[]> {
	    return this.http.get('/locations/get')
	        .map(res => {
	            console.log(res);
	            return res.json();
	        })
	        .catch(err => {
	            return Observable.throw(err.json().error || 'Server error');
	        });
	}

}
