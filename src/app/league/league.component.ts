import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common'; 
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../services/league.service';
import { League } from '../../models/league.model';
import { Team } from '../../models/team.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  progress: boolean = false;
	leagueCtrl = new FormControl();
  filteredLeagues: Observable<League[]>;
	leagues: League[] = [];
	teams: Team[] = [];

  constructor(private location: Location, private route: ActivatedRoute, private leagueService: LeagueService, @Inject(NotificationsService) private notifications: NotificationsService) {}

  displayFn(league?: League): string | undefined {
    return league ? league.name : undefined;
  }

	private _filterLeagues(name: string): League[] {

		const filterValue = name.toLowerCase();

		return this.leagues.filter(league => league.name.toLowerCase().indexOf(filterValue) > -1) || this.leagues.filter(league => league.nameAlternate.toLowerCase().indexOf(filterValue) > -1);
	}

	ngOnInit() {

		this.leagues = this.route.snapshot.data['data'];
    
    if(!!this.route.snapshot.params.id) {
      let selectedLeagues: League = this.leagues.filter(league => league.id==this.route.snapshot.params.id)[0];
      if(!!selectedLeagues){
        this.leagueCtrl.setValue(selectedLeagues);
        this.getTeams();
      }
      else{
        this.notifications.error('', "The wanted football league can't be found.");
        this.location.replaceState("/league");
      }
    }

		this.filteredLeagues = this.leagueCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
		  map(name => name ? this._filterLeagues(name) : this.leagues.slice())
		);

    this.leagueCtrl.valueChanges.subscribe(val => {
      this.location.replaceState("/league");
      this.teams = []
    });
  }

	getTeams() {

    this.progress = true;

    let leagueId = this.leagueCtrl.value.id;
    let leagueName = this.leagueCtrl.value.name;

    this.leagueCtrl.disable();

    this.leagueService.getTeams(leagueId).subscribe(
      (teams) => {
        this.leagueCtrl.enable();
        this.location.replaceState("/league/"+leagueId);
        this.teams = teams;
        if(!this.teams){
          this.notifications.info('', 'List of teams of the football league '+leagueName+' is empty.');
          this.teams = [];
        }
        this.progress = false;
      },
      (err) => {
        this.notifications.error('', 'Unable to load the list of teams of the football league '+leagueName+'. Please try again.');
        this.leagueCtrl.enable();
        this.location.replaceState("/league");
        this.teams = [];
        this.progress = false;
      }
    );
	}

}