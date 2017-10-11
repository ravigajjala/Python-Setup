import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {


	public locationId;
	public locations = [];
	public showEditBox = false;

  constructor(public appSharedService:AppSharedService) { }

  ngOnInit() {

		this.appSharedService.getLocations().subscribe(
			locations => {
				this.appSharedService.locations = locations;
				this.locations = locations;
			},
			err => {
				console.log('Unable to retrive green house locations list');
			}
		);
  }


  addUser(condition) {
  	this.showEditBox = condition;
  }
}
