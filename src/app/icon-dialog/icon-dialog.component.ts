import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-icon-dialog',
  templateUrl: './icon-dialog.component.html',
  styleUrls: ['./icon-dialog.component.scss']
})
export class IconDialogComponent implements OnInit {
  
  constructor( public dialogRef: MatDialogRef<IconDialogComponent>,
          @Inject(MAT_DIALOG_DATA) public currentPlant: any) { 
            console.log(currentPlant);
          }

  public iconClassNumber = 0;

  ngOnInit() {
      this.iconClassNumber = this.currentPlant.id <= 10 ? this.currentPlant.id -1 : this. currentPlant.id - 11;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
