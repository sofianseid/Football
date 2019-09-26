export class Team {

  constructor(
    public id: string,
    public name: string,
    public badge: string,
    public leagueId: string
  ) {}

  public static fromJson(json: Object): Team {
    
    if(!json['idTeam']) return null;

    return new Team(
      json['idTeam'],
      json['strTeam'],
      json['strTeamBadge'],
      json['idLeague']
    );
  }

}