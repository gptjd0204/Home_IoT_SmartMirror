var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('HomeLightModule helper started...');
	},

	getJson: function (url) {
		var self = this;

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				
				// REST API를 통해 받아온 홈 IoT 디바이스 상태 정보를 전부 parsing
				var json = JSON.parse(body);
				// 홈 IoT 디바이스의 상태 정보에서 필요한 정보만 다시 parsing
				var obj = JSON.parse(json)['state']['reported']['MIRROR_MODE'];
				var jsonString = obj.toString();
				
				// Free(심플) 모드 일 때
				if (jsonString === "FREE") {
					self.sendSocketNotification("ModeModule_JSON_RESULT_FREE");
					console.log("Free Success");
				} 
				// 현관 모드 일 때
				else {
					self.sendSocketNotification("ModeModule_JSON_RESULT_DOOR");
					//console.log(jsonString);
					console.log("Door Success");
				}
			}
		});

	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, url) {
		if (notification === "ModeModule_GET_JSON") {
			this.getJson(url);
		}
	}
});
