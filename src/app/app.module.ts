import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MatButtonModule, MatMenuModule, MatButtonToggleModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatListModule, MatInputModule, MatNativeDateModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';


import { HttpModule } from '@angular/http';

// Import components here
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrganicTrackerSheetComponent } from './organic-tracker-sheet/organic-tracker-sheet.component';
import { IconDialogComponent } from './icon-dialog/icon-dialog.component';
import { PlugTrayInformationComponent } from './plug-tray-information/plug-tray-information.component';
import { PlantingInformationComponent } from './planting-information/planting-information.component';
import { TotalSalableComponent } from './total-salable/total-salable.component';
import { StoreDeliveryComponent } from './store-delivery/store-delivery.component';
import { MasterViewComponent } from './master-view/master-view.component';
import { ReceivingFromOtherStationsComponent } from './receiving-from-other-stations/receiving-from-other-stations.component';
import { ShipToOtherStationsComponent } from './ship-to-other-stations/ship-to-other-stations.component';

// Import Services here
import { AppSharedService } from './providers/services/app-shared.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageGreenHouseComponent } from './manage-green-house/manage-green-house.component';
import { ManagePlugCatalogComponent } from './manage-plug-catalog/manage-plug-catalog.component';


// Import Pipes here
import { SearchVarietiesPipe } from './pipes/varieties.pipe';
import { ReceivingInfoPipe } from './pipes/receiving-info.pipe';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/app-organic-tracker-sheet/app-plug-tray-information',
    pathMatch: 'full'
  },
  { path: 'app-login', component: LoginComponent },
  {
    path: 'app-organic-tracker-sheet', component: OrganicTrackerSheetComponent,
    children: [
      { path: 'app-plug-tray-information', component: PlugTrayInformationComponent },
      { path: 'app-planting-information', component: PlantingInformationComponent },
      { path: 'app-receiving-from-other-stations', component: ReceivingFromOtherStationsComponent },
      { path: 'app-ship-to-other-stations', component: ShipToOtherStationsComponent },
      { path: 'app-total-salable', component: TotalSalableComponent },
      { path: 'app-store-delivery', component: StoreDeliveryComponent },
      { path: 'app-master-view', component: MasterViewComponent }
    ]
  }
  // {
  //   //redirect default - should always be at last
  //   path: '**',
  //   redirectTo: '/app-organic-tracker-sheet',
  //   pathMatch: 'full'
  // }
];


@NgModule({
  declarations: [
    AppComponent,
    IconDialogComponent,
    LoginComponent,
    MasterViewComponent,
    ManageUsersComponent,
    ManageGreenHouseComponent,
    ManagePlugCatalogComponent,
    OrganicTrackerSheetComponent,
    PlugTrayInformationComponent,
    PlantingInformationComponent,
    ReceivingFromOtherStationsComponent,
    ReceivingInfoPipe,
    StoreDeliveryComponent,
    ShipToOtherStationsComponent,
    SearchVarietiesPipe,
    TotalSalableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material Modules
    MatButtonModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatInputModule,
    MatTooltipModule
    // NgxDatatableModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    IconDialogComponent,
    ManageUsersComponent,
    ManageGreenHouseComponent,
    ManagePlugCatalogComponent
  ],
  providers: [AppSharedService]
})
export class AppModule { }
