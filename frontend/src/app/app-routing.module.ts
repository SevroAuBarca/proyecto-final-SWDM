import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Pages/auth/auth.component';
import { HomeComponent } from './Pages/home/home.component';
import { JobComponent } from './Pages/job/job.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { MyFeedComponent } from './Pages/my-feed/my-feed.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { UsersComponent } from './pages/users/users.component';
import { JobsComponent } from './Pages/jobs/jobs.component';

/*
  routes:
    -Auth
    -Home
    -JobDescription/:id
    -Profile/:id
    -MyProfile/:id
    -ProfileSettings/:id
*/

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Companies', component: CompaniesComponent },
  { path: 'Users', component: UsersComponent },
  { path: 'Jobs', component: JobsComponent },
  { path: 'Job/:id', component: JobComponent },
  { path: 'Profile/:id', component: ProfileComponent },
  { path: 'MyFeed/:id', component: MyFeedComponent },
  { path: 'Settings/:id', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
