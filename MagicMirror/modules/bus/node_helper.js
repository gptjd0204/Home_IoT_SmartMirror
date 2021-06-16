var NodeHelper = require('node_helper');
var request = require('request');
const convert = require('xml-js');
var url1 = 'http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId?serviceKey=x%2FFHkZXth%2FIvi%2BjFwLV4L%2FKLWcF0AWw7YMp31rWZOTfLV6i1iHHozTxaG9bl3nmpdvSIv9pZPsESwonlRhC07g%3D%3D&stId=168000446';
var url2 = 'http://apis.data.go.kr/6280000/busArrivalService/getBusArrivalList?serviceKey=x%2FFHkZXth%2FIvi%2BjFwLV4L%2FKLWcF0AWw7YMp31rWZOTfLV6i1iHHozTxaG9bl3nmpdvSIv9pZPsESwonlRhC07g%3D%3D&pageNo=1&numOfRows=10&bstopId=168000446&routeId=168000019';
var stId = 168000446;
var 저장용 = 'http://apis.data.go.kr/6280000/busArrivalService/getAllRouteBusArrivalList?serviceKey=x%2FFHkZXth%2FIvi%2BjFwLV4L%2FKLWcF0AWw7YMp31rWZOTfLV6i1iHHozTxaG9bl3nmpdvSIv9pZPsESwonlRhC07g%3D%3D&pageNo=1&numOfRows=10&bstopId=168000446';
module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-JsonTable helper started...');
	},
	getJson: function (url) {
		var self = this;
		request.get({ url: 'http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId?serviceKey=x%2FFHkZXth%2FIvi%2BjFwLV4L%2FKLWcF0AWw7YMp31rWZOTfLV6i1iHHozTxaG9bl3nmpdvSIv9pZPsESwonlRhC07g%3D%3D&stId='+stId, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//var json = JSON.parse(body); //api가 json 데이터라면 이거 사용해서 data : body하면 됨
				// Send the json data back with the url to distinguish it on the receiving part
				var json = body;
				var list = new Array();
				var result = JSON.parse(convert.xml2json(body, {compact: true})); // 호출받은 api가 xml 데이터이기 때문에 json 데이터로 치환시켜주는 함수
				//var result = (convert.xml2json(body, {compact: true}));
				//console.log(result.ServiceResult.msgBody.itemList); // 이건 그냥 내가 콘솔로 확인할려고 쓴거니까 무시해도 됨.
				result.ServiceResult.msgBody.itemList.forEach(element => { // 각 items 요소만큼 반복해서
					//console.log(element.rtNm._text);
					var rtNm = element.rtNm._text;
					url2 = 'http://apis.data.go.kr/6280000/busArrivalService/getBusArrivalList?serviceKey=x%2FFHkZXth%2FIvi%2BjFwLV4L%2FKLWcF0AWw7YMp31rWZOTfLV6i1iHHozTxaG9bl3nmpdvSIv9pZPsESwonlRhC07g%3D%3D&pageNo=1&numOfRows=10&bstopId='+stId+'&routeId='+element.busRouteId._text;
					request.get({ url: url2, method: 'GET' }, function (error, response, body) {

						if (!error && response.statusCode == 200) {
							var json = body;
							var result = JSON.parse(convert.xml2json(body, {compact: true})); // 호출받은 api가 xml 데이터이기 때문에 json 데이터로 치환시켜주는 함수
							result = result.ServiceResult.msgBody.itemList;
							if (result != undefined){
								var data = new Object();
								//console.log(rtNm);

								//console.log(result);

								//console.log(result.ARRIVALESTIMATETIME._text);
								data.BUS = rtNm;
								data.Time = result.ARRIVALESTIMATETIME._text;
								list.push(data);
								console.log(list);
							}
							else{
								console.log(rtNm, ": 정보없음");
							}
						}

							console.log(list);

							self.sendSocketNotification("MMM-JsonTable_JSON_RESULT", {url: url, data: list}); // helloworl에 json 데이터 전송

					});
					//console.log(list);

				});

			}
			
		});
 
	},

	//Subclass socketNotificationReceived received. // helloworld로부터 소켓 신호를 받았을 때 api 호출하는 함수 call

	socketNotificationReceived: function (notification, url) {

		if (notification === "MMM-JsonTable_GET_JSON") {

			this.getJson(url);

		}

	}

});