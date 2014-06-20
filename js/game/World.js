define(["pubsub"], function(pubsub) {
  var World = function (config) {
    var me = this;

    pubsub.subscribe("world.add", function(msg, item) {
      // item is being added to the world
      // this overwrites the move() function, with
      // a function that will check other elements
      // in the world for collisions

/*      item.move_old = item.move;
      item.move = function(){
        console.log(arguments);
        item.move_old.apply(this, arguments);
        //if(me.canMove(item, item.dir))
        //  return me.move();
      };
    });

*/
 //   Kinetic.Group.call(this, config);

    });
  };
  return World;
});
