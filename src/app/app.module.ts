import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';

// Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatDividerModule, MatListModule, MatTabsModule, MatGridListModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
// import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './src/components/main/main.component';
import { AircraftPanelComponent } from './src/components/aircraft-panel/aircraft-panel.component';
import { RecapComponent } from './src/components/recap/recap.component';
import { HeaderComponent } from './src/components/header/header.component';

import { SearchFilterPipe } from './src/components/aircraft-panel/SearchFilterPipe';
import { FiltersPipe } from './src/components/aircraft-panel/FiltersPipe';
import { DownloadPanelComponent } from './src/components/download-panel/download-panel.component';
import { WorkorderPanelComponent } from './src/components/workorder-panel/workorder-panel.component';
import { WorkorderDetailsComponent } from './src/components/workorder-details/workorder-details.component';

import { AircraftService } from './src/services/aircraft-service.service';
import { ImportsService} from './src/services/imports.service';

import { WorkOrderCardComponent } from './src/components/workorder-card/workorder-card.component';
import { WorkordersService } from './src/services/workorders.service';
import { ProgressCardComponent } from './src/components/progress-card/progress-card.component';
import {FilterPipeImports} from './src/components/download-panel/filterPipeImports';
import {FiltersPipeImports} from './src/components/download-panel/filtersPipeImports';
import { TimeManagementService } from './src/services/time-management.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AircraftPanelComponent,
    RecapComponent,
    HeaderComponent,
    SearchFilterPipe,
    FiltersPipe,
    FilterPipeImports,
    FiltersPipeImports,
    DownloadPanelComponent,
    ProgressCardComponent,
    WorkorderPanelComponent,
    WorkorderDetailsComponent,
    WorkOrderCardComponent
  ],
  imports: [
    AngularSplitModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    // MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    // MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    // MatStepperModule,
    MatTabsModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AircraftService,
    ImportsService,
    WorkordersService,
    TimeManagementService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
