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

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    JobComponent,
    ProfileComponent,
    MyFeedComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
