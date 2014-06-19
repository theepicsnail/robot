/*
 * Resources.js stores the gate image file, and is responsible for creating the
 * Kinetic.Image objects that are used by gates.
 */
define(["Kinetic"], function (K) {

  var point_img;
  var exports = {};

  /*
   * Called during loading. The provided callback points to the next step of the
   * loading process and should be called once the image has been loaded and
   * parsed.
   */
  exports.load = function(callback) {
    point_img = new Image();
    exports.point_img = point_img;
    point_img.onload = callback;
    point_img.src = "resources/cross.png";
    //point_img.src = "resources/tile.jpg";
  };

  /*
   * public exports
   */
  return exports;
});
