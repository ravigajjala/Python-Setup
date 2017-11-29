import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Location, Plant, PlugToDeliver, User, UserRelatedInfo } from '../providers/classes/plantInfo.class';
import { AppSharedService } from '../providers/services/app-shared.service';

@Injectable()
export class LoginService {
    public userProfile: any;

    auth0 = new auth0.WebAuth({
        clientID: 'ueeYTUdMHzvjrFrmGAzOgG0b9noHbDML',
        domain: 'bonnie.auth0.com',
        responseType: 'token id_token',
        audience: 'https://bonnie.auth0.com/userinfo',
        redirectUri: 'https://bonnie-organic-tracker.appspot.com/app-organic-tracker-sheet',
        scope: 'openid profile'
    });
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(public router: Router, private http: Http) {
        this.userProfile = '';
    }

    public login(): void {
        if (localStorage.getItem('access_token') && localStorage.getItem('id_token')
            && moment(localStorage.getItem('expires_at')).isAfter(moment())) {
            this.router.navigate(['app-organic-tracker-sheet']);
        } else {
            this.auth0.authorize();
        }
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                // window.location.hash = '';
            } else if (err) {
                console.log(err);
            }
        });
    }

    public getProfile(accessToken): any {
        const self = this;
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }
        return this.auth0.client.userInfo(accessToken, function (err, profile) {
            if (profile) {
                self.userProfile = profile;
            }
        });
    }

    public getLocationByEmail(userEmail: string): Observable<Location> {
        return this.http.get('/locations/getByEmail' + '?userEmail=' + userEmail)
            .map((response: Response) => {
                return response.json();
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }
}
