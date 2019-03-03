import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkorderDetailsComponent } from './src/components/workorder-details/workorder-details.component';
import { RecapComponent } from './src/components/recap/recap.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: RecapComponent },
  { path: 'workorder/:wonumber', component: WorkorderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
