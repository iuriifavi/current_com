let magic = 666; //some magic number received from core
let seed =  Date.now(); // some base number that we receive from core server on start

module.exports = {
  sync: true,
  friendlyName: "Sequence Generator",
  description: "Sequence Generator that initialize by Core Server.",

  inputs: {},
  exits: {},

  fn: function() {
    return magic.toString() + ++seed;
  }
};

