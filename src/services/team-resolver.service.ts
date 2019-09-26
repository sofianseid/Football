import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { TeamService } from './team.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class TeamResolverService implements Resolve<any[]> {

	constructor(private router: Router, private teamService: TeamService, @Inject(NotificationsService) private notifications: NotificationsService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<any[]> {

		return this.teamService.getDetails(route.params.id).pipe(
				map(team => {
					if(!!team) return team;	
				    this.router.navigate(['league']);
					this.notifications.error('', "The wanted football team can't be found.");
					return null;
				}),
				catchError(error => {
				    this.router.navigate(['league']);
					this.notifications.error('', 'Unable to find the football team. Please try again.');
					return of(null);
				}),
				switchMap(team => this.teamService.getPlayers(team.id).pipe(
					map(players => {
						if(!players) {
							this.notifications.info('', 'List of players of the football team is empty.');
							return ([team, null]);
						}
						return ([team, players]);
					}),
					catchError(error => {
						this.notifications.error('', 'Unable to load the list of players of the football team. Please try again.');
						return of([team, null]);
					})
				)
			)
		);
	}

}