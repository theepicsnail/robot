define(["pubsub"], function(pubsub) {

  //Queue class
  // Wraps around pubsub.subscribe in a queue
  // You can call queue.next() to trigger the next callback
  var Queue = function (channel, callback) {

    var self = this;
    this.running = false;
    this.queue = [];

    var id = pubsub.subscribe(channel, function(msg, data) {
      console.log("Received message:", msg);
      self.queue.push(function() {
        console.log("callback started", msg);
        callback(msg, data);
        console.log("callback started", msg);
      });
    });

    this.next = function() {
      console.log("next", channel, self.queue);
      cb = self.queue.shift();
      if(cb !== undefined) {
        cb();
      } else {
        setTimeout(self.next, 1000);
      }
    };
    this.next();
  };
  return Queue;
});
