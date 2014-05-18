/*
 * App serves as the hub that connects each of the pieces
 */
define(["Kinetic", "Stage", "pubsub", "Resources", "game/Robot", "game/Controls"],
  function (Kinetic, Stage, pubsub, R,  Robot) {

    var layer = new Kinetic.Layer();

    function load() {
//      layer.add(Paddle);
      var bg_layer = new Kinetic.Layer();
      bg = new Kinetic.Rect({
        x:0, y:0, width:Stage.getWidth(), height:Stage.getHeight(),
        fillPatternImage: R.point_img,
        fillPatternOffset: {x:0, y:0}
      });
      bg_layer.add(bg);
      bg_layer.setDraggable(true);
      Stage.add(bg_layer);

      layer.add(new Robot({x:3, y:3}));
      layer.setScale(100,100);
      Stage.add(layer);
    }

    function start() {
    }

    return {
      load: load,
      start: start
    };
  });
