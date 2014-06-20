define(["pubsub"], function(pubsub) {

  //Queue class
  // Wraps around pubsub.subscribe in a queue
  // You can call queue.next() to trigger the next callback
  var Queue = function (channel, callback) {

    var self = this;
    this.running = false;
    this.queue = [];
    var id = pubsub.subscribe(channel, function(msg, data) {
      self.queue.push(function() {
        callback(msg, data);
      });
    });

    this.next = function() {
      cb = self.queue.shift();
      if(cb !== undefined) {
        cb();
      } else {
        setTimeout(self.next, 500);
      }
    };
    this.next();
  };
  return Queue;
});
