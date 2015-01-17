// Create a 'Robot' class that extends a group of kinetic objects
define(["Kinetic", "pubsubqueue", "pubsub"], function(Kinetic, Queue, pubsub) {

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
        //points:[1/2, 1/4,
        //        1/2, 1/8,
        //        1/4, 1/8,
        //        3/4, 1/8],
        points:[
          3/4, 1/2,
          7/8, 1/2,
          7/8, 1/4,
          7/8, 3/4,
        ],
        strokeWidth:0.01,
        stroke: "black"
      }));
    },
    turn: function(dir) {
      var self = this;
      console.log(this.getRotationDeg(), dir, this);
      //this.setRotationDeg(this.getRotationDeg() + 5 * dir);
      (new Kinetic.Tween({
        node: self,
        rotationDeg: this.getRotationDeg() + 90 * dir,
        duration: 1/2,
        onFinish: function() {
          console.log("finish");
          console.log(self);
          self.setRotationDeg(
          (self.getRotationDeg() + 360) % 360);
        }
      })).play();
    },
    move: function(dir) {
      var dx = dir * Math.cos(this.getRotation());
      var dy = dir * Math.sin(this.getRotation());
      (new Kinetic.Tween({
        node: this,
        x: this.getX() + dx,
        y: this.getY() + dy,
        duration: 1/2,
        onFinish: function() {
          console.log("finish");
        }
      })).play();
    }
  };
  Kinetic.Util.extend(Robot, superClass);
  Kinetic.Collection.mapMethods(Robot);


  return Robot;
});
