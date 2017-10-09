import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../providers/services/common-data.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {


	public locationId;
	public showEditBox = false;

  constructor(public commonData:CommonDataService) { }

  ngOnInit() {
  		/**
		 * Temp Assignment
		 */
		this.locationId = this.commonData.locations[0];


		/**
		 * Temp Assignment
		 */
  }


  addUser(condition) {
  	this.showEditBox = condition;
  }
}
