class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let times = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      times++;
    }
    return times;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {

    let myLevel = this.numberOfVampiresFromOriginal;
    let compareLevel = vampire.numberOfVampiresFromOriginal;

    if (myLevel < compareLevel) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    let gotcha = 0;

    //if same
    if (this === vampire) {
      return vampire;
    }

    //if first two
    if (this.creator === null)
      return this;
    else if (vampire.creator === null)
      return vampire;
    else if (this.creator === vampire.creator)
      return vampire.creator;

    const returnRoot = (leaf) => {
      while (leaf.creator !== null) {
        leaf = leaf.creator;
      }
      return leaf;
    };

    const checkChildren = (current, targetVampire) => {
      if (current === targetVampire) { //direct child
        gotcha = 1;
      } else { //check children
        if (current.offspring.length !== 0) {//go down
          current.offspring.forEach((child) => checkChildren(child, targetVampire));
        }
      }
    };

    let senior = "";
    let junior = "";
    if (this.isMoreSeniorThan(vampire)) {
      senior = this;
      junior = vampire;
    } else {
      senior = vampire;
      junior = this;
    }

    checkChildren(senior, junior); //down only
    if (gotcha) {
      return senior;
    }

    senior = senior.creator;
    checkChildren(senior, junior); //down only
    if (gotcha) {
      return senior;
    }
    return returnRoot(this);
  }
}

module.exports = Vampire;

