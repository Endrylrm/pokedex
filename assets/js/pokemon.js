class Pokemon {
  id;
  name;
  mainType;
  types = [];
  image;

  constructor(id, name, mainType, types, image) {
    this.id = id;
    this.name = name;
    this.mainType = mainType;
    this.types = types;
    this.image = image;
  }
}
