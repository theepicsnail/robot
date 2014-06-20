// Create a 'Robot' class that extends a group of kinetic objects
define(["Kinetic", "pubsubqueue", "pubsub"], function(Kinetic, Queue, pubsub) {
 /* var Robot = function (config) {

    // Static stuff

    // Instance stuff
    var I = this;
    this.dir = config.dir || Robot.Dir.UP;
    // Moving
    var actionQueue = new Queue("robot", function(msg, data) {
      console.log("action:", msg, data);
      if (msg === "robot.move") {
        I.move(data, actionQueue.next);
      } else if (msg === "robot.turn") {
        I.turn(data, actionQueue.next);
      }
    });
    this.move = function(data, onFinish) {
      var dy = 0, dx = 0;
      switch(I.dir) {
        case Robot.Dir.UP:  dy = -1; break;
        case Robot.Dir.DOWN: dy = 1; break;
        case Robot.Dir.LEFT: dx = -1; break;
        case Robot.Dir.RIGHT: dx = 1; break;
      }

      if (data === Robot.Move.BACKWARD) {
        dx *= -1;
        dy *= -1;
      }

      (new Kinetic.Tween({
        node: I,
        x: I.getX() + dx,
        y: I.getY() + dy,
        duration: 1/2,
        onFinish: onFinish
      })).play();

    };

    // Turning
    this.turn = function(data, onFinish) {
      var angle = 90;
      if (data === Robot.Turn.LEFT) {
        angle = -90;
      }

      (new Kinetic.Tween({
        node: I,
        rotationDeg: I.getRotationDeg() + angle,
        duration: 1/2,
        onFinish: function() {
          deg = I.getRotationDeg() % 360;
          if (deg < 0) {
            deg += 360;
          }
          if (deg % 90 !== 0) {
            deg = 0;
          }

          I.setRotationDeg(deg);
          switch(deg) {
            case 0: I.dir = Robot.Dir.UP; break;
            case 90: I.dir = Robot.Dir.RIGHT; break;
            case 180: I.dir = Robot.Dir.DOWN; break;
            case 270: I.dir = Robot.Dir.LEFT; break;
          }
          onFinish();
        }
      })).play();
    };


  return Robot;*/

  superClass = Kinetic.Group;

  Robot = function(config) {
    config.width = 1;
    config.height =1;
    config.offsetX = 0.5;
    config.offsetY = 0.5;
    config.fill ='green';
    this.__robot_init(config);
  };
  Robot.prototype = {
    __robot_init:function(config) {
      superClass.call(this, config);
      this.className = "Robot";

      this.add(new Kinetic.Rect({ // Body
        x:0.25, y:0.25, width:0.5, height:0.5,
        stroke:"black",
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

    },
    turn: function(dir) {
      var self = this;
      console.log(this.getRotationDeg(), dir);
      (new Kinetic.Tween({
        node: this,
        rotationDeg: this.getRotationDeg() + 90 * dir,
        duration: 1/2,
        onFinish: function() {
          self.setRotationDeg(
          (self.getRotationDeg() + 360) % 360);
        }
      })).play();
    }
  };
  Kinetic.Util.extend(Robot, superClass);
  Kinetic.Collection.mapMethods(Robot);


  return Robot;
});
