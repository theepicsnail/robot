define(["pubsub"], function(pubsub) {
  function addButton(text, callback) {
    var btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = callback;
    document.getElementById("buttonPanel").appendChild(btn);
  }

  addButton("Forward", function(){ pubsub.publish("robot.move", "forward");});
  addButton("Backward", function(){ pubsub.publish("robot.move", "backward");});
  addButton("Turn Left", function(){ pubsub.publish("robot.turn", "left");});
  addButton("Turn Right", function(){ pubsub.publish("robot.turn", "right");});
});
