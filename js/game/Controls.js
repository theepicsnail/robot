define(["pubsub"], function(pubsub) {

  forward = function(){ pubsub.publish("robot.move", "forward"); };
  backward = function(){ pubsub.publish("robot.move", "backward"); };
  turn_left = function(){ pubsub.publish("robot.turn", "left"); };
  turn_right = function(){ pubsub.publish("robot.turn", "right"); };

  document.onkeydown = function (event) {
    switch(event.which) {
      case 37: case 65: turn_left(); break;
      case 38: case 87: forward(); break;
      case 39: case 68: turn_right(); break;
      case 40: case 83: backward(); break;
    }
  };

  function addButton(text, callback) {
    var btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = callback;
    //document.getElementById("buttonPanel").appendChild(btn);
  }

  addButton("Forward", forward);
  addButton("Backward", backward);
  addButton("Turn Left", turn_left);
  addButton("Turn Right", turn_right);
});
