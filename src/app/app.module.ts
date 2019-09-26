import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatProgressSpinnerModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, MatChipsModule, MatProgressBarModule } from '@angular/material';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';

import { LeagueResolverService } from '../services/league-resolver.service';
import { TeamResolverService } from '../services/team-resolver.service';
import { LeagueService } from '../services/league.service';
import { TeamService } from '../services/team.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
  	LeagueResolverService,
    TeamResolverService,
  	LeagueService,
  	TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
