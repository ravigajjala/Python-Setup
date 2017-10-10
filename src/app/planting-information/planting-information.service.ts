import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


import { Plant } from './plant';

@Injectable()
export class PlantingInformationService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private plant_varieties = [{
        'name': 'Better Boy Tomato',
        'icon': 'tomato-bboy'
    }, {
        'name': 'Husky Cherry Red Tomato',
        'icon': 'tomato-hcr'
    }, {
        'name': 'Red Beefsteak Tomato',
        'icon': 'tomato-rb'
    }, {
        'name': 'Green Bell Pepper',
        'icon': 'tomato-rb'
    }, {
        'name': 'Hot Banana Pepper',
        'icon': 'pepper-banana-hot',
    }, {
        'name': 'Jalapeno Pepper',
        'icon': 'pepper-jalapeno'
    }, {
        'name': 'Sweet Banana Pepper',
        'icon': 'pepper-banana-sweet',
    }, {
        'name': 'Broccoli',
        'icon': 'broccoli'
    }, {
        'name': 'Cucumber',
        'icon': 'cucumber-traditional'
    }, {
        'name': 'EggPlant',
        'icon': 'eggplant'
    }, {
        'name': 'Better Boy Tomato',
        'icon': 'tomato-bboy'
    }, {
        'name': 'Husky Cherry Red Tomato',
        'icon': 'tomato-hcr'
    }, {
        'name': 'Red Pepper Bell',
        'icon': 'pepper-bell-red'
    }, {
        'name': 'Kale',
        'icon': 'kale'
    }, {
        'name': 'Hot Banana Pepper',
        'icon': 'pepper-banana-hot'
    }, {
        'name': 'Basil',
        'icon': 'basil'
    }, {
        'name': 'Hot Banana Pepper',
        'icon': 'pepper-banana-hot'
    }, {
        'name': 'Cilantro',
        'icon': 'cilantro'
    }, {
        'name': 'Jalapeno Pepper',
        'icon': 'pepper-jalapeno'
    }, {
        'name': 'Egg Plant',
        'icon': 'eggplant'
    }];

    constructor(private http: Http, public router: Router) {
    }

    createPlants(): Observable<Plant[]> {
        return this.http.post('/plants/create', this.plant_varieties, this.options)
            .map(res => {
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    getPlants(): Observable<Plant[]> {
        return this.http.get('/plants/get')
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }
}
