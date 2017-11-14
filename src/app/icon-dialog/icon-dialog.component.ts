import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppSharedService } from '../providers/services/app-shared.service';

@Component({
  selector: 'app-icon-dialog',
  templateUrl: './icon-dialog.component.html',
  styleUrls: ['./icon-dialog.component.scss']
})
export class IconDialogComponent implements OnInit {
  
  constructor( public dialogRef: MatDialogRef<IconDialogComponent>,
          @Inject(MAT_DIALOG_DATA) public currentPlant: any) { }

  public iconClassNumber = 0;

  ngOnInit() {
      this.iconClassNumber = this.currentPlant.currentItem.id <= 10 ? this.currentPlant.currentItem.id -1 : this. currentPlant.currentItem.id - 11;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
