import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

	constructor(private httpClient: HttpClient) {}
	
	getDetails(teamId: string): Observable<Team> {
		return this.httpClient.post('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='+teamId, '').pipe(
	  		map((jsonArray: Object[]) => Team.fromJson(jsonArray['teams'][0]))
		);
	}

	getPlayers(teamId: string): Observable<Player[]> {
		return this.httpClient.post('https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id='+teamId, '').pipe(
			map((jsonArray: Object[]) => jsonArray['player'].map(jsonItem => Player.fromJson(jsonItem)))
		);
	}

}