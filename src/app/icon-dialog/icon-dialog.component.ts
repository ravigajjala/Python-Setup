import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-icon-dialog',
  templateUrl: './icon-dialog.component.html',
  styleUrls: ['./icon-dialog.component.css']
})
export class IconDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<IconDialogComponent>,
          @Inject(MD_DIALOG_DATA) public currentPlant: any) { }

  public iconClassNumber = 0;

  ngOnInit() {
      this.iconClassNumber = this.currentPlant.id <= 10 ? this.currentPlant.id -1 : this. currentPlant.id - 11;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
