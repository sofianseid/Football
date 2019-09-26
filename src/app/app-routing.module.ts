import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';
import { LeagueResolverService } from '../services/league-resolver.service';
import { TeamResolverService } from '../services/team-resolver.service';

const routes: Routes = [
	{ path: '', redirectTo: 'league', pathMatch: 'full' },
	{ path: 'league', component: LeagueComponent, resolve: { data: LeagueResolverService } },
	{ path: 'league/:id', component: LeagueComponent, resolve: { data: LeagueResolverService } },
	{ path: 'team/:id', component: TeamComponent, resolve: { data: TeamResolverService } },
	{ path: '**', redirectTo: 'league' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
