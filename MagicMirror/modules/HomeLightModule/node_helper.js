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
				var obj = JSON.parse(json)['state']['reported']['SERVO_STATE'];
				// 앞에서 얻어온 정보를 바탕으로 Stringify로 JSON 재구축 후, 파싱
				var test = JSON.stringify({HOME_STATE:[{name: "실내등 ", value: obj}]});
				var test2 = JSON.parse(test);

				
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("HomeLightModule_JSON_RESULT", {url: url, data: test2});
				
			}
		});

	},
	
	putFirstJson: function (state) {
		var self = this;
		var url = "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR2";
		var json = {"tags": [ {"tagName": "SERVO_STATE", "tagValue": state} ] };


		request({ url: url, method: 'PUT', body: JSON.stringify(json)}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("보내졌나?");
			}
		});
	},
	
	putSecondJson: function (state) {
		var self = this;
		var url = "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR3";
		var json = {"tags": [ {"tagName": "SERVO_STATE", "tagValue": state} ] };


		request({ url: url, method: 'PUT', body: JSON.stringify(json)}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("보내졌나?");
			}
		});
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "HomeLightModule_GET_JSON") {
			this.getJson(payload);
		} else if (notification === "HomeFirstLightModule_PUT_JSON") {
			this.putFirstJson(payload);
		} else if (notification === "HomeSecondLightModule_PUT_JSON") {
			this.putSecondJson(payload);
		}
	}
});
