export class League {

  constructor(
    public id: string,
    public name: string,
    public nameAlternate: string,
    public sport: string
  ) {}

  public static fromJson(json: Object): League {
    return new League(
      json['idLeague'],
      json['strLeague'],
      json['strLeagueAlternate'],
      json['strSport']
    );
  }

}