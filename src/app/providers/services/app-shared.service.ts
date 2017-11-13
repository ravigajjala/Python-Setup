import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog } from '@angular/material';
import { IconDialogComponent } from '../../icon-dialog/icon-dialog.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Location, Plant, PlugToDeliver, User, UserRelatedInfo } from '../classes/plantInfo.class';


@Injectable()
export class AppSharedService {
    private messageSource = new BehaviorSubject<string>('UPDATED');
    public currentMessage = this.messageSource.asObservable();
    private currentStage;
    public users: User[];
    public locations: Location[];
    public plants: Plant[];
    public varietyOptions: any[];
    public varietyOptionsType: string; 
    public availableVarietyOptionsType: string[] = ["PLUG", "PLANTING"];
    private isPlantNameSorted: boolean = false;
    private isWeekNumberSorted: boolean = false;
    public searchFieldValue: any = undefined;
    public shippedNumber = 0;
    public totalNotif = 0;
    public userId: string = 'sainath8090';
    public currentGreenHouseLocation: any;
    public routesToShow = [];
    public routeTotal = [];
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    public plantsData = [{
        "name": "Better Boy Tomato",
        "icon": "tomato-bboy",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#tomato-bboy"
    },
    {
        "name": "Better Bush Tomato",
        "icon": "tomato-bbush",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#tomato-bbush"
    }, {
        "name": "Husky Cherry Red Tomato",
        "icon": "tomato-hcr",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#tomato-hcr"
    }, {
        "name": "Red Beefsteak Tomato",
        "icon": "tomato-rb",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#tomato-rb"
    },
    {
        "name": "Roma Tomato",
        "icon": "tomato-roma",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#tomato-roma"
    },
    {
        "name": "Sweet Million Tomato",
        "icon": "tomato-sm",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#tomato-sm"
    }, {
        "name": "Green Bell Pepper",
        "icon": "pepper-bell-green",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-bell-green"
    }, {
        "name": "Hot Banana Pepper",
        "icon": "pepper-banana-hot",
        "color_id": "st2",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-banana-hot"
    }, {
        "name": "Jalapeno Pepper",
        "icon": "pepper-jalapeno",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-jalapeno"
    },
    {
        "name": "Poblano Pepper",
        "icon": "pepper-poblano",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-poblano"
    },
    {
        "name": "Red Bell Pepper",
        "icon": "pepper-bell-red",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-bell-red"
    },
    {
        "name": "Serrano Pepper",
        "icon": "pepper-serrano",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-serrano"
    },
    {
        "name": "Sweet Banana Pepper",
        "icon": "pepper-banana-sweet",
        "color_id": "st2",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-banana-sweet"
    },
    {
        "name": "Yellow Bell Pepper",
        "icon": "pepper-bell-yellow",
        "color_id": "st2",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#pepper-bell-yellow"
    }, {
        "name": "Broccoli",
        "icon": "broccoli",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#broccoli"
    }, {
        "name": "Cucumber Bush",
        "icon": "cucumber-bush",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#cucumber-bush"
    },
    {
        "name": "Cucumber Traditional",
        "icon": "cucumber-traditional",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#cucumber-traditional"
    },
    {
        "name": "Eggplant",
        "icon": "eggplant",
        "color_id": "st3",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#eggplant"
    },
    {
        "name": "Kale",
        "icon": "kale",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#kale"
    },
    {
        "name": "Romaine Lettuce",
        "icon": "lettuce-romaine",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#lettuce-romaine"
    },
    {
        "name": "Strawberries",
        "icon": "strawberry",
        "color_id": "st0",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#strawberry"
    },
    {
        "name": "Zucchini",
        "icon": "zucchini",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#zucchini"
    },
    {
        "name": "Basil",
        "icon": "basil",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#basil"
    },
    {
        "name": "Chives",
        "icon": "chives",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#chives"
    },
    {
        "name": "Cilantro",
        "icon": "cilantro",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#cilantro"
    },
    {
        "name": "Curled Parsley",
        "icon": "parsley-curled",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#parsley-curled"
    },
    {
        "name": "Flat Parsley",
        "icon": "parsley-flat",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#parsley-flat"
    },
    {
        "name": "Rosemary",
        "icon": "rosemary",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#rosemary"
    },
    {
        "name": "Sage",
        "icon": "sage",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#sage"
    },
    {
        "name": "Sweet Mint",
        "icon": "mint-sweet",
        "color_id": "st1",
        "url": "dist/assets/sprites/icon-sprite-sheet.svg#mint-sweet"
    }];

    private ghLocationsData = [{
            "code": "010 Hub",
            "first_name": "Tim",
            "last_name": "Trussell",
            "city": "Union Springs",
            "state": " AL",
            "email": "tim.trussell@bonnieplants.com",
            "shipToLocations": [],
            "routes": [60,61,62,63]
        },
        {
            "code": "010_Drop ",
            "first_name": "Daniel",
            "last_name": "Dawson",
            "city": "Rydal",
            "state": " GA",
            "email": "rydalga@bonniesales.com",
            "shipToLocations": [],
            "routes": [71,72]
        },
        {
            "code": "010_Drop ",
            "first_name": "Ben",
            "last_name": "Hawk",
            "city": "Alvaton",
            "state": " GA",
            "email": "alvatonga@bonnieplants.com",
            "shipToLocations": [],
            "routes": [91,92,93]
        },
        {
            "code": "010_Drop ",
            "first_name": "Don",
            "last_name": "Jacobsen",
            "city": "Jasper",
            "state": " AL",
            "email": "dj.bonniefarm@hotmail.com",
            "shipToLocations": [],
            "routes": [81]
        },
        {
            "code": "010_Drop ",
            "first_name": "Jay",
            "last_name": "Moorer",
            "city": "Athens",
            "state": " AL",
            "email": "athensal@bonniesales.com",
            "shipToLocations": [],
            "routes": []
        },
        {
            "code": "30_Drop",
            "first_name": "Bradley",
            "last_name": "Adams",
            "city": "Liverpool",
            "state": " TX",
            "email": "houstontx@bonnieplants.com",
            "shipToLocations": [],
            "routes": []
        },
        {
            "code": "30_Drop",
            "first_name": "Brandon",
            "last_name": "Cox",
            "city": "Beeville",
            "state": " TX",
            "email": "beevilletx@bonnieplants.com",
            "shipToLocations": [],
            "routes": []
        },
        {
            "code": "010_Drop ",
            "first_name": "Brant",
            "last_name": "Railey",
            "city": "Pearl",
            "state": " MS",
            "email": "pearlms@bonnieplants.com",
            "shipToLocations": [],
            "routes": []
        },
        {
            "code": "30_Drop",
            "first_name": "Andrew",
            "last_name": "Reeves",
            "city": "Donaldsonville",
            "state": "LA",
            "email": "fosterreeves@gmail.com",
            "shipToLocations": [],
            "routes": []
        },
        {
            "code": "37 Hub",
            "first_name": "Shad",
            "last_name": "Rotton",
            "city": "Waverly",
            "state": " FL",
            "email": "waverlyfl@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "37_Drop",
            "first_name": "Kyle",
            "last_name": "Boyce",
            "city": "La Belle",
            "state": " FL",
            "email": "southfl@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "010_Drop ",
            "first_name": "Brad",
            "last_name": "Trussell",
            "city": "Lake city",
            "state": " FL",
            "email": "BradTrussell@aol.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Mark",
            "last_name": "Anderson",
            "city": "Pala",
            "state": " CA",
            "email": "palaca@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Randy",
            "last_name": "Beasley",
            "city": "Linden",
            "state": " CA",
            "email": "randy.beasley@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "52 Hub",
            "first_name": "Deke",
            "last_name": "Jackson",
            "city": "Watsonville",
            "state": " CA",
            "email": "watsonvilleca@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "47 Hub",
            "first_name": "Tim",
            "last_name": "Marchiando",
            "city": "Terra Bella",
            "state": " CA",
            "email": "marchiando@sbcglobal.net"
        },
        {
            "code": "1",
            "first_name": "Leilani",
            "last_name": "Zelensky",
            "city": "Oxnard",
            "state": " CA",
            "email": "losangeles@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Kenny",
            "last_name": "Golden",
            "city": "Chino Valley",
            "state": " AZ",
            "email": "bpfchino@cableone.net"
        },
        {
            "code": "30 Hub",
            "first_name": "Tim",
            "last_name": "Sherwood",
            "city": "Jacksonville",
            "state": " TX",
            "email": "tim.sherwood@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Dennis",
            "last_name": "Ucles",
            "city": "Midland",
            "state": " TX",
            "email": "midlandtx@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "30_Drop",
            "first_name": "Shawn",
            "last_name": "Beam",
            "city": "Whitesboro",
            "state": " TX",
            "email": "whitesborotx@bonnieplans.com",
            "shipToLocations": []
        },
        {
            "code": "30_Drop",
            "first_name": "Tom",
            "last_name": "Ellis",
            "city": "Lonoke",
            "state": " AR",
            "email": "lonokear@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "30_Drop",
            "first_name": "Mickey",
            "last_name": "Shepherd",
            "city": "Howe",
            "state": " OK",
            "email": "bpfok32@yahoo.com",
            "shipToLocations": []
        },
        {
            "code": "39 Hub",
            "first_name": "Mark",
            "last_name": "Alvarado",
            "city": "McIntosh",
            "state": " NM",
            "email": "mcintoshnm@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "30_Drop",
            "first_name": "Will",
            "last_name": "Rogers",
            "city": "Abilene",
            "state": " TX",
            "email": "abilenetx@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "39_Drop",
            "first_name": "Nick",
            "last_name": "Schiavone",
            "city": "Muleshoe",
            "state": " TX",
            "email": "nick.schiavone@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Chuck",
            "last_name": "Roten",
            "city": "Elizabeth city",
            "state": " NC",
            "email": "chuck.roten@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Richard",
            "last_name": "Brooks",
            "city": "Spartanburg",
            "state": " SC",
            "email": "spartanburgsc@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Stephen",
            "last_name": "Chapman",
            "city": "Manning",
            "state": " SC",
            "email": "bonnieplants1@yahoo.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Steve",
            "last_name": "Phelps",
            "city": "Lexington",
            "state": " NC",
            "email": "plantembonnie@yahoo.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Joe",
            "last_name": "Watson",
            "city": "Fayetteville",
            "state": " NC",
            "email": "joewatbpfnc@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "67 Hub",
            "first_name": "Chris",
            "last_name": "Terrell",
            "city": "Grantsville",
            "state": " UT",
            "email": "grantsvilleutah67@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "52_Drop",
            "first_name": "Andrew",
            "last_name": "Clinkenbeard",
            "city": "Silver Springs",
            "state": " NV",
            "email": "aclinken@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "47_Drop",
            "first_name": "Alfredo",
            "last_name": "Perez",
            "city": "Henderson",
            "state": " NV",
            "email": "alfredo.perez@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "010_Drop ",
            "first_name": "Adam",
            "last_name": "Alley",
            "city": "Bells",
            "state": " TN",
            "email": "acalley4@netzero.com",
            "shipToLocations": []
        },
        {
            "code": "82_Drop",
            "first_name": "Paul",
            "last_name": "Bozeman",
            "city": "Charleston",
            "state": " WV",
            "email": "charlestonwv@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "010_Drop ",
            "first_name": "Josh",
            "last_name": "Glover",
            "city": "Knoxville",
            "state": " TN",
            "email": "knoxvilletn@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Joey",
            "last_name": "Padgett",
            "city": "Springfield",
            "state": "KY",
            "email": "jpadgettbpf@bellsouth.net"
        },
        {
            "code": "101_Drop",
            "first_name": "Chad",
            "last_name": "Sanders",
            "city": "Abingdon",
            "state": " VA",
            "email": "abingdonva@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "16 Hub",
            "first_name": "Al",
            "last_name": "Cordle",
            "city": "Anabel",
            "state": " MO",
            "email": "showmebonnie@hughes.net"
        },
        {
            "code": "105 Hub",
            "first_name": "Bo",
            "last_name": "Hancock",
            "city": "Walden",
            "state": " NY",
            "email": "waldenny@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "49 Hub",
            "first_name": "Lavell",
            "last_name": "Head",
            "city": "Castle Rock",
            "state": " WA",
            "email": "lavell.head@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Casey",
            "last_name": "Jansen",
            "city": "Monroe Township",
            "state": " NJ",
            "email": "casey@hollandgreenhousesinc.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Peter",
            "last_name": "Jansen",
            "city": "Phillipsburg",
            "state": " NJ",
            "email": "Harmonynj@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Jeremy",
            "last_name": "Powell",
            "city": "West Wyoming",
            "state": " PA",
            "email": "westwyomingpa@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Alex",
            "last_name": "Armstrong",
            "city": "Everett",
            "state": " WA",
            "email": "everettwa@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "51_Hub",
            "first_name": "Gary",
            "last_name": "Schwisow",
            "city": "Marsing",
            "state": " ID",
            "email": "schwisow@speedyquick.net"
        },
        {
            "code": "1",
            "first_name": "Jesse",
            "last_name": "Tuma",
            "city": "Plains",
            "state": " MT",
            "email": "jessetumamtstation@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "51_Drop",
            "first_name": "Dwight",
            "last_name": "Hudson",
            "city": "Zillah",
            "state": " WA",
            "email": "dwight.w.hudson@hotmail.com",
            "shipToLocations": []
        },
        {
            "code": "49_Drop",
            "first_name": "Matt",
            "last_name": "Kight",
            "city": "Roseburg",
            "state": " OR",
            "email": "roseburgor@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "105_Drop",
            "first_name": "Randy",
            "last_name": "Trussell",
            "city": "Preston",
            "state": " CT",
            "email": "randy.trussell@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "29 Hub",
            "first_name": "Josh",
            "last_name": "Montague",
            "city": "Pierce",
            "state": " CO",
            "email": "joshmontague69@yahoo.com",
            "shipToLocations": []
        },
        {
            "code": "29_Drop",
            "first_name": "Jamie",
            "last_name": "Cody",
            "city": "LaJunta",
            "state": " CO",
            "email": "jcody22173@aol.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Devon",
            "last_name": "Wilkerson",
            "city": "Plainville",
            "state": "KS",
            "email": "bonnieplantskansas@yahoo.com",
            "shipToLocations": []
        },
        {
            "code": "101 Hub",
            "first_name": "Chris",
            "last_name": "Simpson",
            "city": "King George",
            "state": " VA",
            "email": "chris.simpson@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Lee",
            "last_name": "Turner",
            "city": "Rhoadesville",
            "state": " VA",
            "email": "lee.turner@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "101_Drop",
            "first_name": "Dave",
            "last_name": "Drury",
            "city": "Kennedyville",
            "state": " MD",
            "email": "david103@aol.com",
            "shipToLocations": []
        },
        {
            "code": "101_Drop",
            "first_name": "Wesley",
            "last_name": "Pennington",
            "city": "New Cumberland",
            "state": " PA",
            "email": "wesley.pennington@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Jim",
            "last_name": "Clouse",
            "city": "Ottawa",
            "state": " IL",
            "email": "plantman2606@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Walter",
            "last_name": "Ellis",
            "city": "Nora Springs",
            "state": " IA",
            "email": "wellis06@aol.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Blake",
            "last_name": "Finlayson",
            "city": "Crawfordsville",
            "state": "IN",
            "email": "crawfordsvillein@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Josh",
            "last_name": "Gaatz",
            "city": "Wautoma",
            "state": " WI",
            "email": "gaatzj@hotmail.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Travis",
            "last_name": "Hammonds",
            "city": "St. Elmo",
            "state": " IL",
            "email": "travis.hammonds@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Rob",
            "last_name": "Holder",
            "city": "Milton",
            "state": " WI ",
            "email": "bonnieplants68@hotmail.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "BJ",
            "last_name": "Kruger",
            "city": "California",
            "state": " MO",
            "email": "drplants@aol.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Casey",
            "last_name": "Brooks",
            "city": "Cygnet",
            "state": " OH",
            "email": "bpfcygnet@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "82 hub",
            "first_name": "Matt",
            "last_name": "Green",
            "city": "Homer city",
            "state": " PA",
            "email": "blairsvillepa@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Ben",
            "last_name": "Santee",
            "city": "Homeworth",
            "state": " OH",
            "email": "ben.santee@yahoo.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Donnie",
            "last_name": "Sims",
            "city": "Marysville",
            "state": " OH",
            "email": "marysvilleoh@bonniesales.com",
            "shipToLocations": []
        },
        {
            "code": "1",
            "first_name": "Mark",
            "last_name": "Daniels",
            "city": "Ithaca",
            "state": " MI",
            "email": "markdaniels@bonnieplantfarm.net"
        },
        {
            "code": "107 Hub",
            "first_name": "Vann",
            "last_name": "Brett",
            "city": "Niagra",
            "state": "Canada",
            "email": "brett.vann@bonnieplants.com",
            "shipToLocations": []
        },
        {
            "code": "16_drop",
            "first_name": "Pat",
            "last_name": "Creed",
            "city": "Moorehead",
            "state": " MN",
            "email": "Pcreed57@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "16_Drop",
            "first_name": "Phil",
            "last_name": "Does",
            "city": "Wakefield",
            "state": " NE",
            "email": "wakefieldbonnie70@gmail.com",
            "shipToLocations": []
        },
        {
            "code": "67_drop",
            "first_name": "Justin",
            "last_name": "Viles",
            "city": "Gillette",
            "state": " WY",
            "email": "justinviles@hotmail.com",
            "shipToLocations": []
        },
        {
            "code": "105_Drop",
            "first_name": "Tom",
            "last_name": "Mason",
            "city": "Lempster",
            "state": " NH",
            "email": "bpflempster@verizon.net"
        },
        {
            "code": "105_Drop",
            "first_name": "Bobby",
            "last_name": "Cole",
            "city": "New Berlin",
            "state": " NY",
            "email": "bpfnewberlin@frontiernet.net"
        },
        {
            "code": "105_Drop",
            "first_name": "Todd",
            "last_name": "Simons",
            "city": "Hancock",
            "state": " ME",
            "email": "station69simons@yahoo.com",
            "shipToLocations": []
        }];
    constructor(private dialog: MatDialog, private http: Http, public router: Router) {
        this.currentGreenHouseLocation = {
            city: "Dublin",
            state: "OH"
        };
    }

    // To get greenhouse locations from datastore
    getLocations(): Observable<Location[]> {
        return this.http.get('/locations/get')
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    updateLocation(location: Location): Observable<Location[]> {
        return this.http.put('/locations/put', location, this.options)
            .map((res: Response) => {
                return res;
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    // To get plant varieties from datastore
    getPlantVarieties(): Observable<Plant[]> {
        return this.http.get('/plants/get')
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    // To get users list from datastore
    getUsers(): Observable<User[]> {
        return this.http.get('/users/get')
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    addLocation(): Observable<Location[]> {
        return this.http.post('/locations/create', this.ghLocationsData, this.options)
            .map((res: Response) => {
                console.log(res);
                return res;
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    addPlants(): Observable<Plant[]> {
        return this.http.post('/plants/create', this.plantsData, this.options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    varietiesSort(): void {
        if (!this.isPlantNameSorted) {
            this.varietyOptions = this.varietyOptions
                .sort((a, b) =>
                    (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
            this.isPlantNameSorted = true;
        }
        this.isWeekNumberSorted = false;
        this.varietyOptions = this.varietyOptions.reverse();
    }

    weekSort(): void {
        if (!this.isWeekNumberSorted) {
            this.varietyOptions = this.varietyOptions
                .sort((a, b) =>
                    (a.weekNumber > b.weekNumber) ? -1 : ((b.weekNumber > a.weekNumber) ? 1 : 0));
            this.isWeekNumberSorted = true;
        }
        this.isPlantNameSorted = false;
        this.varietyOptions = this.varietyOptions.reverse();
    }

    openDialog(currentItem): void {
        console.log('called');
        const dialogRef = this.dialog.open(IconDialogComponent, {
            data: {currentItem, routesToShow: this.routesToShow}
        });
    }

    getPlugToDeliverData(): Observable<PlugToDeliver[]> {
        return this.http.get('/plug-to-deliver/get' + '?userGreenHouseLocation=' +
            this.currentGreenHouseLocation.city + ', ' + this.currentGreenHouseLocation.state)
            .map(res => {
                return res.json();
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    createPlugToDeliverData(plugToDeliver: PlugToDeliver): Observable<PlugToDeliver[]> {
        return this.http.post('/plug-to-deliver/create', plugToDeliver, this.options)
            .map(res => {
                return res;
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    updatePlugToDeliverData(plugToDeliver: PlugToDeliver): Observable<PlugToDeliver[]> {
        return this.http.put('/plug-to-deliver/put', plugToDeliver, this.options)
            .map(res => {
                return res;
            })
            .catch(err => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }

    getUserPreviousRoute(userId: string): Observable<UserRelatedInfo[]> {
        return this.http.get('/user/get')
            .map((res: Response) => {
                return res.json();
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
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
        const total = array.reduce(function (a, b) {
            return a + b[key]
        }, 0);
        return total;
    }

    updateRouteTotal () {
        if(this.routesToShow && this.routesToShow.length){
            for (let i = 0; i < this.routesToShow.length; i++) {
                this.routeTotal[i] = 0;
                if(this.varietyOptions && this.varietyOptions.length) {
                    for(let j=0;j < this.varietyOptions.length;j++) {
                        this.routeTotal[i] += (this.varietyOptions[j].appStoreDelivery.deliveryQuantity[i] || 0);
                    }
                }
            }
        }
    }

    sendUserRelatedInfo(): Observable<UserRelatedInfo[]> {
        return this.http.post('/user/post', { "user_id": this.userId, "lastRoute": this.router.url }, this.options)
            .map((res: Response) => {
                return res;
            })
            .catch((err: Response) => {
                return Observable.throw(err.json().error || 'Server error');
            });
    }
    
    changeMessage(message: string) {
        this.messageSource.next(message);
    }
}
