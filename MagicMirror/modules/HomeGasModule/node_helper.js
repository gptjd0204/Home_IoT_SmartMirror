var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('HomeGasModule helper started...');
	},

	// 가스 밸브를 제어하는 아두이노의 상태를 조회하는 함수 (GET을 사용하여 JSON을 받아)
	getJson: function (url) {
		var self = this;

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				
				// REST API를 통해 받아온 홈 IoT 디바이스 상태 정보를 전부 parsing
				var json = JSON.parse(body);
				// 홈 IoT 디바이스의 상태 정보에서 필요한 정보만 다시 parsing
				var obj = JSON.parse(json)['state']['reported']['SERVO_STATE'];
				// 앞에서 얻어온 정보를 바탕으로 Stringify로 JSON 재구축 후, 파싱
				var test = JSON.stringify({HOME_STATE:[{name: "가스밸브 ", value: obj}]});
				var test2 = JSON.parse(test);
				
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("HomeGasModule_JSON_RESULT", {url: url, data: test2});
				
			}
		});
	},
	
	// 가스 밸브를 제어하는 아두이노의 상태를 변경하는 함수 (PUT을 사용하여 JSON을 변경)
	putJson: function (state) {
		var self = this;
		var url = "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR1";
		var json = {"tags": [ {"tagName": "SERVO_STATE", "tagValue": state} ] };


		request({ url: url, method: 'PUT', body: JSON.stringify(json)}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("가스밸브 상태 업로드 완료");
			}
		});
	},

	//모듈 간 소켓 통신을 통해 알림을 받고 알림에 맞는 함수를 실행
	socketNotificationReceived: function (notification, payload) {
		if (notification === "HomeGasModule_GET_JSON") {
			this.getJson(payload);
		} else if (notification === "HomeGasModule_PUT_JSON") {
			this.putJson(payload);
		}
	}
});
