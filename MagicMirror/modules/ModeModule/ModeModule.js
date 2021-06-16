'use strict';

// 스마트 미러 모드 변경 모듈(현관모드, 심플 모드)
Module.register("ModeModule", {

	jsonData: null,

	// Default module config.
	defaults: {
		url: "",
		arrayName: null,
		updateInterval: 5000
	},

	start: function () {
		this.getJson();
		this.scheduleUpdate();
	},

	scheduleUpdate: function () {
		var self = this;
		setInterval(function () {
			self.getJson();
		}, this.config.updateInterval);
	},

	getJson: function () {
		this.sendSocketNotification("ModeModule_GET_JSON", this.config.url);
	},

	socketNotificationReceived: function (notification, payload) {
		// 안드로이드 앱에서 심플 모드 입력 시
		if (notification === "ModeModule_JSON_RESULT_FREE") {
			var str = JSON.stringify({HomeModule: {visible: "false",position: "bottom_center"},bus: {visible: "false",position: "top_right"},currentweather: {visible: "false",position: "top_right"},PIRSensor: {visible: "false"}});		
			var obj = JSON.parse(str);

			this.sendNotification('CHANGE_POSITIONS', obj);
			this.sendNotification('FREE_MODE');
			console.log("free 수신완료");
		}
		// 안드로이드 앱에서 현관 모드 입력 시
		if (notification === "ModeModule_JSON_RESULT_DOOR") {
			//this.sendNotification('CHANGE_POSITIONS_DEFAULTS');	//전부 기본 값으로 
			var str = JSON.stringify({HomeModule: {visible: "true",position: "bottom_center"},bus: {visible: "true",position: "top_right"},currentweather: {visible: "true",position: "top_right"},PIRSensor: {visible: "true"}});
			var obj = JSON.parse(str);
			console.log(obj);

			this.sendNotification('CHANGE_POSITIONS', obj);
			this.sendNotification('DOOR_MODE');
			console.log("Door 수신완료");
		}
	},
	

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		return wrapper;
	}
});
