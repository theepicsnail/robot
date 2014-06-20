/*global require*/
"use strict";

/*
 * Main launcher, called from require.js and the index.html, this starts
 * off the loading process, and upon load complete, launches the app.
 */
require.config({
  paths: {
    'Kinetic': "lib/kineticjs/kinetic"
  },
  baseUrl: "js"
});

require(["LoadingScreen", "Resources", "App"],
  function (LoadingScreen,   Resources,   App) {
    LoadingScreen.start();
    Resources.load(function () {
      console.log("A");
      App.load();
      console.log("A");
      LoadingScreen.stop();
      App.start();
    });
  }
);
