import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {


	public locationId;
	public locations = [];
	public showEditBox = false;

  constructor(public appSharedService: AppSharedService) { }


  addUser(condition) {
  	this.showEditBox = condition;
  }
}
