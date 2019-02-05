import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split'

//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MatCheckboxModule} from '@angular/material';
// import {MatButtonModule} from '@angular/material';
// import {MatInputModule} from '@angular/material/input';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatListModule} from '@angular/material/list';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
// import {MatStepperModule} from '@angular/material/stepper';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatTableModule} from '@angular/material/table';
// import {MatSortModule} from '@angular/material/sort';
// import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './src/components/main/main.component';
import { WorkOrderPanelComponent } from './src/components/work-order-panel/work-order-panel.component';
import { AircraftPanelComponent } from './src/components/aircraft-panel/aircraft-panel.component';
import { RecapComponent } from './src/components/recap/recap.component';
import { HeaderComponent } from './src/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WorkOrderPanelComponent,
    AircraftPanelComponent,
    RecapComponent,
    HeaderComponent
  ],
  imports: [
    AngularSplitModule.forRoot(),
    BrowserAnimationsModule,
    // MatCheckboxModule,
    // MatCheckboxModule,
    // MatButtonModule,
    // MatInputModule,
    // MatAutocompleteModule,
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatMenuModule,
    // MatSidenavModule,
    // MatToolbarModule,
    // MatListModule,
    // MatGridListModule,
    MatCardModule,
    // MatStepperModule,
    // MatTabsModule,
    // MatExpansionModule,
    // MatButtonToggleModule,
    // MatChipsModule,
    MatIconModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatDialogModule,
    // MatTooltipModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatSortModule,
    // MatPaginatorModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
