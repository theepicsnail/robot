/*
 * The stage is the base Kinetic drawing point. Everything that is visible to
 * the user is (through some path) added onto the stage.
 *
 * This is a singleton module
 */
define(["Kinetic"], function (Kinetic) {
  var stage = new Kinetic.Stage({
    container: 'container',
    x:0, y:0,
    width: 500,
    height: 500,
    fill: 'blue'
  });

  return stage;
});
