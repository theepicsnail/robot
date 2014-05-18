// Create a 'Robot' class that extends a group of kinetic objects
define(["Kinetic", "pubsub"], function(Kinetic, pubsub) {
  var Robot = function (config) {
    window.robot = this;
    // super constructor
    config.offset=[1/2, 1/2];
    Kinetic.Group.call(this, config);

    // Static stuff
    Robot.Dir = {UP:1, RIGHT:2, DOWN:3, LEFT:4};
    Robot.Move = {FORWARD:"forward", BACKWARD:"backward"};
    Robot.Turn = {LEFT:"left", RIGHT:"right"};

    // Instance stuff
    var I = this;
    this.dir = config.dir || Robot.Dir.UP;
    this.move = function(dx, dy) {
      console.log("Move:", dy, dx);
      (new Kinetic.Tween({
        node: I,
        x: I.getX() + dx,
        y: I.getY() + dy,
        duration: 1
      })).play();
    };

    this.turn = function(dr) {
      (new Kinetic.Tween({
        node: I,
        rotationDeg: I.getRotationDeg() + dr,
        duration: 1,
        onFinish: function() {
          deg = I.getRotationDeg() % 360;
          if (deg < 0) {
            deg += 360;
          }
          I.setRotationDeg(deg);
          switch(deg) {
            case 0: I.dir = Robot.Dir.UP; break;
            case 90: I.dir = Robot.Dir.RIGHT; break;
            case 180: I.dir = Robot.Dir.DOWN; break;
            case 270: I.dir = Robot.Dir.LEFT; break;
          }
        }
      })).play();
    };

    // Listeners
    pubsub.subscribe("robot.move", function(msg, data) {
      var dy = 0, dx = 0;
      switch(I.dir) {
        case Robot.Dir.UP:  dy = -1; break;
        case Robot.Dir.DOWN: dy = 1; break;
        case Robot.Dir.LEFT: dx = -1; break;
        case Robot.Dir.RIGHT: dx = 1; break;
      }
      switch(data) {
        case Robot.Move.FORWARD: I.move(dx, dy); break;
        case Robot.Move.BACKWARD: I.move(-dx, -dy); break;
      }
    });
    pubsub.subscribe("robot.turn", function(msg, data) {
      switch(data) {
        case Robot.Turn.LEFT: I.turn(-90); break;
        case Robot.Turn.RIGHT: I.turn(90); break;
      }
    });

    // Kinetic object stuff
    this.add(new Kinetic.Rect({ // Body
      x:0.25, y:0.25, width:0.5, height:0.5,
      fill: "gray", strokeWidth:0.01
    }));
    this.add(new Kinetic.Line({ // Pusher arm
      points:[1/2, 1/4,
              1/2, 1/8,
              1/4, 1/8,
              3/4, 1/8],
      strokeWidth:0.01,
      stroke: "black"
    }));

  };
  Kinetic.Util.extend(Robot, Kinetic.Group);
  return Robot;
});