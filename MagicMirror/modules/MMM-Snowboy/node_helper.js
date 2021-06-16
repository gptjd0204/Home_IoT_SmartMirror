/** Snowboy module **/

"use strict"
const path = require("path")
const Snowboy = require("@bugsounet/snowboy").SnowboyV2

var NodeHelper = require("node_helper")
let log = function() {
  var context = "[SNOWBOY]"
  return Function.prototype.bind.call(console.log, console, context)
}()

module.exports = NodeHelper.create({
  start: function () {
    console.log("[SNOWBOY] MMM-Snowboy Version:", require('./package.json').version)
    this.config = {}
    this.running = false
    this.snowboyConfig = {}
    this.snowboy = null
  },

  socketNotificationReceived: function (notification, payload) {
    switch(notification) {
      case "INIT":
        this.config = payload
        this.initialize()
        break
      case "START":
        if (!this.running) this.activate()
        break
      case "STOP":
        if (this.running) this.deactivate()
        break
    }
  },

  initialize: function() {
    var debug = (this.config.debug) ? this.config.debug : false
    if (!this.config.debug) log = () => { /* do nothing */ }
    this.snowboyConfig = this.config.detectors
    log("DetectorConfig:", this.snowboyConfig)
    this.snowboy = new Snowboy(this.snowboyConfig, this.config.micConfig, (detected) => { this.onDetected(detected) }, this.config.debug )
    this.snowboy.init()
    console.log("[SNOWBOY] Initialized with", this.snowboy.modelsNumber(), "Models")
    if (this.config.autoStart) this.activate()
  },

  activate: function() {
    this.snowboy.start()
    this.running = true
  },

  onDetected: function (detected) {
    this.sendSocketNotification("DETECTED", detected)
    this.deactivate()
  },

  deactivate: function() {
    this.snowboy.stop()
    this.running = false
  }
})
