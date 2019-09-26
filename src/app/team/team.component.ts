import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../models/team.model';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamComponent implements OnInit {

  hover: boolean;
	team: Team;
	players: Player[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.team = this.route.snapshot.data['data'][0];
    this.players = this.route.snapshot.data['data'][1];
  }

}