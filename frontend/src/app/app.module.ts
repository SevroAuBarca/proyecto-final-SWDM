import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Pages/auth/auth.component';
import { HomeComponent } from './Pages/home/home.component';
import { JobComponent } from './Pages/job/job.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { MyFeedComponent } from './Pages/my-feed/my-feed.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { HeaderComponent } from './Components/header/header.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { UsersComponent } from './pages/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpUserComponent } from './Components/sign-up-user/sign-up-user.component';
import { SignUpCompanyComponent } from './Components/sign-up-company/sign-up-company.component';
import { JobsComponent } from './Pages/jobs/jobs.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { ProfileUserComponent } from './Pages/profile-user/profile-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    JobComponent,
    ProfileComponent,
    MyFeedComponent,
    SettingsComponent,
    HeaderComponent,
    CompaniesComponent,
    UsersComponent,
    SignInComponent,
    SignUpUserComponent,
    SignUpCompanyComponent,
    JobsComponent,
    EditModalComponent,
    ProfileUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
