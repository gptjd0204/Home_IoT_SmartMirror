'use strict';

// 현재 실내등의 상태 정보를 실시간으로 표시해주는 모듈
Module.register("HomeLightModule", {

	jsonData: null,

	// Default module config.
	defaults: {
		url: "",
		arrayName: null,
		keepColumns: [],
		size: 0,
		tryFormatDate: false,
		updateInterval: 15000
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

	// Request node_helper to get json from url
	getJson: function () {
		this.sendSocketNotification("HomeLightModule_GET_JSON", this.config.url);
	},
	
	// 1번 실내등 put 함수
	putFirstLighttJson: function (state) {
		this.sendSocketNotification("HomeFirstLightModule_PUT_JSON", state);
	},
	
	// 2번 실내등 put 함수
	putSecondLighttJson: function (state) {
		this.sendSocketNotification("HomeSecondLightModule_PUT_JSON", state);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "HomeLightModule_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.url === this.config.url)
			{
				this.jsonData = payload.data;
				this.updateDom(500);
			}
		}
	},
	// Google Assistant로부터 일번 실내등을 제어하는 명령을 받으면 실행  
	notificationReceived: function (notification, payload, sender) {
		if (notification === "LED1_ON") {
			this.putFirstLighttJson("ON");
			console.log("일번 실내등 켜 응답 완료");
		} else if(notification === "LED1_OFF") {
			this.putFirstLighttJson("OFF");
			console.log("일번 실내등 꺼 응답 완료");
		} else if(notification === "LED2_ON") {
			this.putSecondLighttJson("ON");
			console.log("이번 실내등 켜 응답 완료");
		} else if(notification === "LED2_OFF") {
			this.putSecondLighttJson("OFF");
			console.log("이번 실내등 꺼 응답 완료");
		} 
		else if(notification === "ALL_OFF") {
			this.putFirstLighttJson("OFF");
			this.putSecondLighttJson("OFF");
			console.log("전부 꺼 응답 완료");
		}
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = "xsmall";

		if (!this.jsonData) {
			wrapper.innerHTML = "데이터를 받아오는 중입니다...";
			return wrapper;
		}
		
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");
		
		var items = [];
		if (this.config.arrayName) {
			items = this.jsonData[this.config.arrayName];
		}
		else {
			items = this.jsonData;
		}
		

		// Check if items is of type array
		if (!(items instanceof Array)) {
			wrapper.innerHTML = "Json data is not of type array! " +
				"Maybe the config arrayName is not used and should be, or is configured wrong";
			return wrapper;
		}

		items.forEach(element => {
			var row = this.getTableRow(element);
			tbody.appendChild(row);
		});

		table.appendChild(tbody);
		wrapper.appendChild(table);
		return wrapper;
	},

	getTableRow: function (jsonObject) {
		var row = document.createElement("tr");
		for (var key in jsonObject) {
			var cell = document.createElement("td");
			
			var valueToDisplay = "";
			if (key === "icon") {
				cell.classList.add("fa", jsonObject[key]);
			}
			else if (this.config.tryFormatDate) {
				valueToDisplay = this.getFormattedValue(jsonObject[key]);
			}
			else {
				if ( this.config.keepColumns.length == 0 || this.config.keepColumns.indexOf(key) >= 0 ){
					valueToDisplay = jsonObject[key];
				}
			}

			var cellText = document.createTextNode(valueToDisplay);
			
			if ( this.config.size > 0 && this.config.size < 9 ){
				var h = document.createElement("H" + this.config.size );
				h.appendChild(cellText)
				cell.appendChild(h);
			}
			else
			{
				cell.appendChild(cellText);
			}
			
			row.appendChild(cell);
		}
		return row;
	}
});
