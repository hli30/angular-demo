import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugOverviewComponent } from './components/bug-overview/bug-overview.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  {
    path: 'users/:userId', // this base route is to mock a logged-in state
    children: [{ path: 'bug-overview', component: BugOverviewComponent }],
  },
  { path: 'placeholder1', component: PlaceholderComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PlaceholderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
