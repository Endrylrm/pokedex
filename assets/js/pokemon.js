class Pokemon {
  id;
  name;
  mainType;
  types = [];
  image;
  stats = [];
  flavorTexts = [];

  constructor(id, name, mainType, types, image) {
    this.id = id;
    this.name = name;
    this.mainType = mainType;
    this.types = types;
    this.image = image;
  }

  getTotalPoints() {
    let sum = 0;

    this.stats.forEach((stat) => (sum += stat));

    return sum;
  }

  getRandomFlavorText() {
    return this.flavorTexts[
      Math.floor(this.flavorTexts.length * Math.random())
    ];
  }
}
