export class Player {

  constructor(
    public id: string,
    public name: string,
    public position: string,
    public dateBorn: string,
    public transferAmout: string,
    public img: string
  ) {}

  public static fromJson(json: Object): Player {
    return new Player(
      json['idPlayer'],
      json['strPlayer'],
      json['strPosition'],
      json['dateBorn'],
      json['strSigning'],
      json['strCutout']
    );
  }

  getIMG(): string {
    return (!!this.img ? this.img : 'assets/images/default.jpg');
  }

  getTransferAmout(): string {
    return (!!this.transferAmout ? this.transferAmout : 'Unknown');
  }

}