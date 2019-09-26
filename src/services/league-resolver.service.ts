import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LeagueService } from './league.service';
import { League } from '../models/league.model';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class LeagueResolverService implements Resolve<League[]> {

	constructor(private leagueService: LeagueService, @Inject(NotificationsService) private notifications: NotificationsService) {}

	resolve(route: ActivatedRouteSnapshot): Observable<League[]> {

	    return this.leagueService.getSoccerLeagues().pipe(
			map(leagues => {
				if(!leagues) {
					this.notifications.info('', 'List of football leagues is empty.');
					return null;
				}
				return leagues;
			}),
			catchError(error => {
				this.notifications.error('', 'Unable to load the list of football leagues. Please try again.');
				return of(null);
			})
		);
	}

}