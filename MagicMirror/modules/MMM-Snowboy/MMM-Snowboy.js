//
// Module : MMM-Snowboy v2
// @bugsounet
//

Module.register("MMM-Snowboy", {
  defaults: {
    debug: false,
    autoStart: true,
    micConfig: {
      recorder: "arecord",
      device: "plughw:1",
      audioGain: 2.0,
      applyFrontend: true, // When you use only `snowboy` and `smart_mirror`, `false` is better. But with other models, `true` is better.
    },
    detectors: [
      {
        Model: "alexa",
        Sensitivity: null,
        onDetected: {
          notification: "ALEXA_ACTIVATE",
          parameters: null
        }
      },
      {
        Model: "jarvis",
        Sensitivity: null,
        onDetected: {
          notification: "GA_ACTIVATE",
          parameters: null
        }
      }
    ]
  },

  start: function() {
    this.sendSocketNotification('INIT', this.config)
  },

  notificationReceived: function(notification, payload, sender) {
    switch (notification) {
      case "SNOWBOY_START":
      case "DETECTOR_START":
        this.sendSocketNotification('START')
        break
      case "SNOWBOY_STOP":
      case "DETECTOR_STOP":
        this.sendSocketNotification('STOP')
        break
    }
  },

  socketNotificationReceived: function(notification, payload) {
    switch (notification) {
      case "DETECTED":
        this.config.detectors.forEach(detector => {
          if (detector.Model === payload) {
            this.sendNotification(detector.onDetected.notification, detector.onDetected.parameters)
          }
        })
        break
    }
  }
})
