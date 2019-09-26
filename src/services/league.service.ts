import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { League } from '../models/league.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

	constructor(private httpClient: HttpClient) {}

	getLeagues(): Observable<League[]> {
	    return this.httpClient.post('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php', '').pipe(
			map((jsonArray: Object[]) => jsonArray['leagues'].map(jsonItem => League.fromJson(jsonItem)))
	    );
	}

	getSoccerLeagues(): Observable<League[]> {
    	return this.getLeagues().pipe(
  			map((leagues: League[]) => leagues.filter((league: League) => league.sport === 'Soccer'))
    	);
	}

	getTeams(leagueId: string): Observable<Team[]> {
    	return this.httpClient.post('https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id='+leagueId, '').pipe(
  			map((jsonArray: Object[]) => jsonArray['teams'].map(jsonItem => Team.fromJson(jsonItem)))
    	);
	}

}