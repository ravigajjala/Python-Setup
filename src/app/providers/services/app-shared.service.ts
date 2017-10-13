import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { IconDialogComponent } from '../../icon-dialog/icon-dialog.component';
import {APIROOT} from '../constants';
import { User, Plant, Location } from '../classes/plantInfo.class';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class AppSharedService {
    private currentStage;
    public users: User[];
    public locations: Location[];
    public plants: Plant[];
    public varietyOptions: any[];
    private isSorted = false;
    private rootApiLink = '/';

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    public plantsData = [{
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
    }];
    private data = [
        {
            "code": "010 Hub",
            "name": "Trussell Tim",
            "city": "Union Springs",
            "state": " AL",
            "email": "tim.trussell@bonnieplants.com"
        },
        {
            "code": "010_Drop ",
            "name": "Dawson Daniel",
            "city": "Rydal",
            "state": " GA",
            "email": "rydalga@bonniesales.com"
        },
        {
            "code": "010_Drop ",
            "name": "Hawk Ben",
            "city": "Alvaton",
            "state": " GA",
            "email": "alvatonga@bonnieplants.com"
        },
        {
            "code": "010_Drop ",
            "name": "Jacobsen Don",
            "city": "Jasper",
            "state": " AL",
            "email": "dj.bonniefarm@hotmail.com"
        },
        {
            "code": "010_Drop ",
            "name": "Moorer Jay",
            "city": "Athens",
            "state": " AL",
            "email": "athensal@bonniesales.com"
        },
        {
            "code": "30_Drop",
            "name": "Adams Bradley",
            "city": "Liverpool",
            "state": " TX",
            "email": "houstontx@bonnieplants.com"
        },
        {
            "code": "30_Drop",
            "name": "Cox Brandon",
            "city": "Beeville",
            "state": " TX",
            "email": "beevilletx@bonnieplants.com"
        },
        {
            "code": "010_Drop ",
            "name": "Railey Brant",
            "city": "Pearl",
            "state": " MS",
            "email": "pearlms@bonnieplants.com"
        },
        {
            "code": "30_Drop",
            "name": "Reeves Andrew",
            "city": "Donaldsonville",
            "state": "LA",
            "email": "fosterreeves@gmail.com"
        },
        {
            "code": "37 Hub",
            "name": "Rotton Shad",
            "city": "Waverly",
            "state": " FL",
            "email": "waverlyfl@bonnieplants.com"
        },
        {
            "code": "37_Drop",
            "name": "Boyce Kyle",
            "city": "La Belle",
            "state": " FL",
            "email": "southfl@bonnieplants.com"
        },
        {
            "code": "010_Drop ",
            "name": "Trussell Brad",
            "city": "Lake city",
            "state": " FL",
            "email": "BradTrussell@aol.com"
        },
        {
            "code": "1",
            "name": "Anderson Mark",
            "city": "Pala",
            "state": " CA",
            "email": "palaca@bonnieplants.com"
        },
        {
            "code": "1",
            "name": "Beasley Randy",
            "city": "Linden",
            "state": " CA",
            "email": "randy.beasley@bonnieplants.com"
        },
        {
            "code": "52 Hub",
            "name": "Jackson Deke",
            "city": "Watsonville",
            "state": " CA",
            "email": "watsonvilleca@bonniesales.com"
        },
        {
            "code": "47 Hub",
            "name": "Marchiando Tim",
            "city": "Terra Bella",
            "state": " CA",
            "email": "marchiando@sbcglobal.net"
        },
        {
            "code": "1",
            "name": "Zelensky Leilani",
            "city": "Oxnard",
            "state": " CA",
            "email": "losangeles@bonnieplants.com"
        },
        {
            "code": "1",
            "name": "Golden Kenny",
            "city": "Chino Valley",
            "state": " AZ",
            "email": "bpfchino@cableone.net"
        },
        {
            "code": "30 Hub",
            "name": "Sherwood Tim",
            "city": "Jacksonville",
            "state": " TX",
            "email": "tim.sherwood@bonniesales.com"
        },
        {
            "code": "1",
            "name": "Ucles Dennis",
            "city": "Midland",
            "state": " TX",
            "email": "midlandtx@bonnieplants.com"
        },
        {
            "code": "30_Drop",
            "name": "Beam Shawn",
            "city": "Whitesboro",
            "state": " TX",
            "email": "whitesborotx@bonnieplans.com"
        },
        {
            "code": "30_Drop",
            "name": "Ellis Tom",
            "city": "Lonoke",
            "state": " AR",
            "email": "lonokear@bonnieplants.com"
        },
        {
            "code": "30_Drop",
            "name": "Shepherd Mickey",
            "city": "Howe",
            "state": " OK",
            "email": "bpfok32@yahoo.com"
        },
        {
            "code": "39 Hub",
            "name": "Alvarado Mark",
            "city": "McIntosh",
            "state": " NM",
            "email": "mcintoshnm@bonnieplants.com"
        },
        {
            "code": "30_Drop",
            "name": "Rogers Will",
            "city": "Abilene",
            "state": " TX",
            "email": "abilenetx@bonnieplants.com"
        },
        {
            "code": "39_Drop",
            "name": "Schiavone Nick",
            "city": "Muleshoe",
            "state": " TX",
            "email": "nick.schiavone@bonniesales.com"
        },
        {
            "code": "1",
            "name": "Roten Chuck",
            "city": "Elizabeth city",
            "state": " NC",
            "email": "chuck.roten@bonniesales.com"
        },
        {
            "code": "1",
            "name": "Brooks Richard",
            "city": "Spartanburg",
            "state": " SC",
            "email": "spartanburgsc@bonnieplants.com"
        },
        {
            "code": "1",
            "name": "Chapman Stephen",
            "city": "Manning",
            "state": " SC",
            "email": "bonnieplants1@yahoo.com"
        },
        {
            "code": "1",
            "name": "Phelps Steve",
            "city": "Lexington",
            "state": " NC",
            "email": "plantembonnie@yahoo.com"
        },
        {
            "code": "1",
            "name": "Watson Joe",
            "city": "Fayetteville",
            "state": " NC",
            "email": "joewatbpfnc@gmail.com"
        },
        {
            "code": "67 Hub",
            "name": "Terrell Chris",
            "city": "Grantsville",
            "state": " UT",
            "email": "grantsvilleutah67@bonnieplants.com"
        },
        {
            "code": "52_Drop",
            "name": "Clinkenbeard Andrew",
            "city": "Silver Springs",
            "state": " NV",
            "email": "aclinken@gmail.com"
        },
        {
            "code": "47_Drop",
            "name": "Perez Alfredo ",
            "city": "Henderson",
            "state": " NV",
            "email": "alfredo.perez@bonniesales.com"
        },
        {
            "code": "010_Drop ",
            "name": "Alley Adam",
            "city": "Bells",
            "state": " TN",
            "email": "acalley4@netzero.com"
        },
        {
            "code": "82_Drop",
            "name": "Bozeman Paul",
            "city": "Charleston",
            "state": " WV",
            "email": "charlestonwv@bonnieplants.com"
        },
        {
            "code": "010_Drop ",
            "name": "Glover Josh",
            "city": "Knoxville",
            "state": " TN",
            "email": "knoxvilletn@bonnieplants.com"
        },
        {
            "code": "16_Drop",
            "name": "Padgett Joey",
            "city": "Springfield",
            "state": "KY",
            "email": "jpadgettbpf@bellsouth.net"
        },
        {
            "code": "101_Drop",
            "name": "Sanders Chad",
            "city": "Abingdon",
            "state": " VA",
            "email": "abingdonva@bonnieplants.com"
        },
        {
            "code": "16 Hub",
            "name": "Cordle Al",
            "city": "Anabel",
            "state": " MO",
            "email": "showmebonnie@hughes.net"
        },
        {
            "code": "105 Hub",
            "name": "Hancock Bo",
            "city": "Walden",
            "state": " NY",
            "email": "waldenny@bonnieplants.com"
        },
        {
            "code": "49 Hub",
            "name": "Head Lavell",
            "city": "Castle Rock",
            "state": " WA",
            "email": "lavell.head@bonnieplants.com"
        },
        {
            "code": "1",
            "name": "Jansen Casey",
            "city": "Monroe Township",
            "state": " NJ",
            "email": "casey@hollandgreenhousesinc.com"
        },
        {
            "code": "1",
            "name": "Jansen Peter",
            "city": "Phillipsburg",
            "state": " NJ",
            "email": "Harmonynj@gmail.com"
        },
        {
            "code": "1",
            "name": "Powell Jeremy",
            "city": "West Wyoming",
            "state": " PA",
            "email": "westwyomingpa@bonnieplants.com"
        },
        {
            "code": "1",
            "name": "Armstrong Alex",
            "city": "Everett",
            "state": " WA",
            "email": "everettwa@bonnieplants.com"
        },
        {
            "code": "51_Hub",
            "name": "Schwisow Gary",
            "city": "Marsing",
            "state": " ID",
            "email": "schwisow@speedyquick.net"
        },
        {
            "code": "1",
            "name": "Tuma Jesse",
            "city": "Plains",
            "state": " MT",
            "email": "jessetumamtstation@gmail.com"
        },
        {
            "code": "51_Drop",
            "name": "Hudson Dwight",
            "city": "Zillah",
            "state": " WA",
            "email": "dwight.w.hudson@hotmail.com"
        },
        {
            "code": "49_Drop",
            "name": "Kight Matt",
            "city": "Roseburg",
            "state": " OR",
            "email": "roseburgor@bonnieplants.com"
        },
        {
            "code": "105_Drop",
            "name": "Trussell Randy",
            "city": "Preston",
            "state": " CT",
            "email": "randy.trussell@bonnieplants.com"
        },
        {
            "code": "29 Hub",
            "name": "Montague Josh",
            "city": "Pierce",
            "state": " CO",
            "email": "joshmontague69@yahoo.com"
        },
        {
            "code": "29_Drop",
            "name": "Cody Jamie",
            "city": "LaJunta",
            "state": " CO",
            "email": "jcody22173@aol.com"
        },
        {
            "code": "16_Drop",
            "name": "Wilkerson Devon",
            "city": "Plainville",
            "state": "KS",
            "email": "bonnieplantskansas@yahoo.com"
        },
        {
            "code": "101 Hub",
            "name": "Simpson Chris",
            "city": "King George",
            "state": " VA",
            "email": "chris.simpson@bonniesales.com"
        },
        {
            "code": "1",
            "name": "Turner Lee",
            "city": "Rhoadesville",
            "state": " VA",
            "email": "lee.turner@bonnieplants.com"
        },
        {
            "code": "101_Drop",
            "name": "Drury Dave",
            "city": "Kennedyville",
            "state": " MD",
            "email": "david103@aol.com"
        },
        {
            "code": "101_Drop",
            "name": "Pennington Wesley",
            "city": "New Cumberland",
            "state": " PA",
            "email": "wesley.pennington@bonniesales.com"
        },
        {
            "code": "16_Drop",
            "name": "Clouse Jim",
            "city": "Ottawa",
            "state": " IL",
            "email": "plantman2606@gmail.com"
        },
        {
            "code": "16_Drop",
            "name": "Ellis Walter",
            "city": "Nora Springs",
            "state": " IA",
            "email": "wellis06@aol.com"
        },
        {
            "code": "16_Drop",
            "name": "Finlayson Blake",
            "city": "Crawfordsville",
            "state": "IN",
            "email": "crawfordsvillein@bonniesales.com"
        },
        {
            "code": "16_Drop",
            "name": "Gaatz Josh",
            "city": "Wautoma",
            "state": " WI",
            "email": "gaatzj@hotmail.com"
        },
        {
            "code": "16_Drop",
            "name": "Hammonds Travis",
            "city": "St. Elmo",
            "state": " IL",
            "email": "travis.hammonds@bonnieplants.com"
        },
        {
            "code": "16_Drop",
            "name": "Holder Rob",
            "city": "Milton",
            "state": " WI ",
            "email": "bonnieplants68@hotmail.com"
        },
        {
            "code": "16_Drop",
            "name": "Kruger BJ",
            "city": "California",
            "state": " MO",
            "email": "drplants@aol.com"
        },
        {
            "code": "1",
            "name": "Brooks Casey",
            "city": "Cygnet",
            "state": " OH",
            "email": "bpfcygnet@gmail.com"
        },
        {
            "code": "82 hub",
            "name": "Green Matt",
            "city": "Homer city",
            "state": " PA",
            "email": "blairsvillepa@bonnieplants.com"
        },
        {
            "code": "1",
            "name": "Santee Ben",
            "city": "Homeworth",
            "state": " OH",
            "email": "ben.santee@yahoo.com"
        },
        {
            "code": "1",
            "name": "Sims Donnie",
            "city": "Marysville",
            "state": " OH",
            "email": "marysvilleoh@bonniesales.com"
        },
        {
            "code": "1",
            "name": "Daniels Mark",
            "city": "Ithaca",
            "state": " MI",
            "email": "markdaniels@bonnieplantfarm.net"
        },
        {
            "code": "107 Hub",
            "name": "Brett Vann",
            "city": "Niagra",
            "state": "Canada",
            "email": "brett.vann@bonnieplants.com"
        },
        {
            "code": "16_drop",
            "name": "Creed Pat",
            "city": "Moorehead",
            "state": " MN",
            "email": "Pcreed57@gmail.com"
        },
        {
            "code": "16_Drop",
            "name": "Does Phil",
            "city": "Wakefield",
            "state": " NE",
            "email": "wakefieldbonnie70@gmail.com"
        },
        {
            "code": "67_drop",
            "name": "Viles Justin",
            "city": "Gillette",
            "state": " WY",
            "email": "justinviles@hotmail.com"
        },
        {
            "code": "105_Drop",
            "name": "Mason Tom",
            "city": "Lempster",
            "state": " NH",
            "email": "bpflempster@verizon.net"
        },
        {
            "code": "105_Drop",
            "name": "Cole Bobby",
            "city": "New Berlin",
            "state": " NY",
            "email": "bpfnewberlin@frontiernet.net"
        },
        {
            "code": "105_Drop",
            "name": "Simons Todd",
            "city": "Hancock",
            "state": " ME",
            "email": "station69simons@yahoo.com"
        }
    ];

    constructor(private dialog: MdDialog, private http: Http, public router: Router, private apiroot: APIROOT) { 
        // this.rootApiLink = this.apiroot.getRelativeLink();
    }

    // To get greenhouse locations from datastore
    getLocations(): Observable<Location[]> {
        return this.http.get(this.rootApiLink + 'locations/get')
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    // To get plant varieties from datastore
    getPlantVarieties(): Observable<Plant[]> {
        return this.http.get(this.rootApiLink + 'plants/get')
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    // To get users list from datastore
    getUsers(): Observable<User[]> {
        return this.http.get(this.rootApiLink + 'users/get')
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    addUser(): Observable<User[]> {
        return this.http.post(this.rootApiLink + 'users/create', this.data, this.options)
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    addLocation(): Observable<Location[]> {
        return this.http.post(this.rootApiLink + 'locations/create', [{
            "city": "Dublin",
            "state": "OH"
        }], this.options)
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    addPlants(): Observable<Location[]> {
        return this.http.post(this.rootApiLink + 'plants/create', this.plantsData, this.options)
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    sort() {
        if (!this.isSorted) {
            this.varietyOptions = this.varietyOptions
                .sort((a, b) =>
                    (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
            this.isSorted = true;
        }
        this.varietyOptions = this.varietyOptions.reverse();
    }

    openDialog(currentItem): void {
        const dialogRef = this.dialog.open(IconDialogComponent, {
            data: currentItem
        });
    }

    getStage(): number {
        return this.currentStage;
    }

    /**
     * [getTotalOfColumn - return total of the given key for input object array]
     * @param {[type]} array [the array for which the key is present]
     * @param {[type]} key   [the key for which the totak is to be calculated]
     */
    getTotalOfColumn(array, key) {
        let total = array.reduce(function (a, b) {
            return a + b[key]
        }, 0);
        return total;
    }
}
