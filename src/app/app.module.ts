import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { PlantingInformationService } from './planting-information/planting-information.service';

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

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/organic-tracker',
    pathMatch: 'full'
  },
  { path: 'app-login', component: LoginComponent },
  { path: 'organic-tracker', component: OrganicTrackerSheetComponent ,
    children:[
      { path: 'app-plug-tray-information', component: PlugTrayInformationComponent },
      { path: 'app-planting-information', component: PlantingInformationComponent },
      { path: 'app-receiving-from-other-stations', component: ReceivingFromOtherStationsComponent },
      { path: 'app-ship-to-other-stations', component: ShipToOtherStationsComponent },
      { path: 'app-total-salable', component: TotalSalableComponent },
      { path: 'app-store-delivery', component: StoreDeliveryComponent},
      { path: 'app-master-view', component: MasterViewComponent }
    ]
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrganicTrackerSheetComponent,
    IconDialogComponent,
    PlugTrayInformationComponent,
    PlantingInformationComponent,
    TotalSalableComponent,
    StoreDeliveryComponent,
    MasterViewComponent,
    ReceivingFromOtherStationsComponent,
    ShipToOtherStationsComponent
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
    MaterialModule,
    // NgxDatatableModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    IconDialogComponent,
  ],
  providers: [PlantingInformationService]
})
export class AppModule { }
