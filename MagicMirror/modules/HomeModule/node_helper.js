var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	
	start: function () {
		console.log('HomeModule helper started...');
	},

	getJson: function (url) {
		var self = this;

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// REST API를 통해 받아온 홈 IoT 디바이스 상태 정보를 전부 parsing
				var json = JSON.parse(body);
				// 홈 IoT 디바이스의 상태 정보에서 필요한 정보만 다시 parsing
				var obj = JSON.parse(json)['state']['desired']['SERVO_STATE'];
				// 앞에서 얻어온 정보를 바탕으로 Stringify로 JSON 재구축 후, 파싱
				var test = JSON.stringify({HOME_STATE:[{name: "실내등1 ", value: obj}]});
				//var test = JSON.stringify({HOME_STATE:[{name: "Home_LED", value: obj}]});
				var test2 = JSON.parse(test);
				
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("HomeLightModule_JSON_RESULT", {url: url, data: test2});
			}
		});
	},

	postJson: function (url) {
		url2 = 'https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR2';
		var aa = {"tags": [ {"tagName": "SERVO_STATE", "tagValue":url}]};
		var self = this;
		request({ url: url2, method: 'PUT', body: JSON.stringify(aa)}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("보내졌나?");
			}
		});
	},
	
	getSecondJson: function (url) {
		var self = this;

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// REST API를 통해 받아온 홈 IoT 디바이스 상태 정보를 전부 parsing
				var json = JSON.parse(body);
				// 홈 IoT 디바이스의 상태 정보에서 필요한 정보만 다시 parsing
				var obj = JSON.parse(json)['state']['desired']['SERVO_STATE'];
				// 앞에서 얻어온 정보를 바탕으로 Stringify로 JSON 재구축 후, 파싱
				var test = JSON.stringify({HOME_STATE:[{name: "실내등2 ", value: obj}]});
				//var test = JSON.stringify({HOME_STATE:[{name: "Home_LED", value: obj}]});
				var test2 = JSON.parse(test);
				
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("SecondLightModule_JSON_RESULT", {url: url, data: test2});
			}
		});
	},

	getGasJson: function (url) {
		var self = this;

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				var obj = JSON.parse(json)['state']['desired']['SERVO_STATE'];
				var test = JSON.stringify({HOME_STATE:[{name: "가스밸브 ", value: obj}]});
				var test2 = JSON.parse(test)

				self.sendSocketNotification("HomeGasModule_JSON_RESULT", {url: url, data: test2});
			}
		});
	},

	putGasJson: function (url) {
		url2 = 'https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR1';
		var aa = {"tags": [ {"tagName": "SERVO_STATE", "tagValue":url}]};
		var self = this;
		request({ url: url2, method: 'PUT', body: JSON.stringify(aa)}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("222보내졌나?");
			}
		});
	},

	//Subclass socketNotificationReceived received.

	socketNotificationReceived: function (notification, url) {
		if (notification === "HomeLightModule_GET_JSON") {
			this.getJson(url);
		}
		else if(notification === "HomeLightModule_Post_JSON"){
			this.postJson(url);//postJson에서는 url값에 url대신 value 넣었음 추후에 파라미터 수정 필요	
		}
		
		if(notification === "Gas_GET_JSON"){
			this.getGasJson(url);	
		}
		else if(notification === "Gas_PUT_JSON"){
			this.putGasJson(url);	
		}
		
		if (notification === "SecondLightModule_GET_JSON") {
			this.getSecondJson(url);
		}
	}

});
