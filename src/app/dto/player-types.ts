export class PlayerType {

  id: number;
  pluralName: String;
  singularShortName: String;

  constructor(id, pluralName, singularShortName) {
    this.id = id;
    this.pluralName = pluralName;
    this.singularShortName = singularShortName;
  }
}
