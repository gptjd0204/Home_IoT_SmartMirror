'use strict';

 
// 집 안 도면과 함께 집 안 상태를 아이콘으로 표시해주는 모듈
Module.register("HomeModule", {

	jsonData: null,
	jsonData2: null,
	jsonData3: null,


	// Default module config.
	defaults: {
		url: "",
		url1: "",
		url2:"",
		arrayName: null,
		keepColumns: [],
		size: 0,
		tryFormatDate: false,
		updateInterval: 5000,
		value:"",
		value2:"",
		value3:""
	},

	start: function () {
		this.getJson();
		this.getSecondJson();
		this.getGasJson();
		this.scheduleUpdate();
	},

	scheduleUpdate: function () {
		var self = this;
		setInterval(function () {
			self.getJson();
			self.getSecondJson();
			self.getGasJson();
		}, this.config.updateInterval);
	},

	// Request node_helper to get json from url
	getJson: function () {
		this.sendSocketNotification("HomeLightModule_GET_JSON", this.config.url);
	},
	getSecondJson: function () {
		this.sendSocketNotification("SecondLightModule_GET_JSON", this.config.url2);
	},
	postJson: function () {
		this.sendSocketNotification("HomeLightModule_POST_JSON", this.value);
	},
	getGasJson: function () {
		this.sendSocketNotification("Gas_GET_JSON", this.config.url1);
	},
	putGasJson: function () {
		this.sendSocketNotification("Gas_PUT_JSON", this.gasvalue);
	},
	
	socketNotificationReceived: function (notification, payload) {
		if (notification === "HomeLightModule_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.url === this.config.url)
			{
				this.jsonData = payload.data;
				//this.updateDom(1000);
			}
		}
		if (notification === "HomeGasModule_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.url === this.config.url1)
			{
				this.jsonData2 = payload.data;
				//this.updateDom(1000);
			}
		}
		if (notification === "SecondLightModule_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.url === this.config.url2)
			{
				this.jsonData3 = payload.data;
				//this.updateDom(1000);
			}
		}
		this.updateDom(500);
	},


	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		var Lightimg1 = document.createElement("img");
		var Lightimg2 = document.createElement("img");
		var Gasimg = document.createElement("img");

		Lightimg1.className = "Light1";
		Lightimg2.className = "Light2";
		Gasimg.className = "Gas";
		wrapper.className = "xsmall";
		
		//Lightimg1.addEventListener("click", () => this.sendSocketNotification("HomeLightModule_Post_JSON",this.config.value));
		//Gasimg.addEventListener("click", () => this.sendSocketNotification("Gas_PUT_JSON",this.config.value2));
		
		if (!this.jsonData || !this.jsonData2 || !this.jsonData3) {
			wrapper.innerHTML = "데이터를 받아오는 중입니다...";
			return wrapper;
		} 

		var items = [];
		var items2 = [];
		var items3 = [];
		
		if (this.config.arrayName) {
			items = this.jsonData[this.config.arrayName];
			items2 = this.jsonData2[this.config.arrayName];
			items3 = this.jsonData3[this.config.arrayName];
		}
		else {
			items = this.jsonData;
			items2 = this.jsonData2;
			items3 = this.jsonData3;
		}
		
		// Check if items is of type array
		if (!(items instanceof Array)) {
			wrapper.innerHTML = "Json data is not of type array! " +
				"Maybe the config arrayName is not used and should be, or is configured wrong";
			return wrapper;
		}

		items.forEach(element => {
			if (element.value == "ON"){
				this.config.value = "OFF";
				Lightimg1.src = "modules/HomeModule/yellowlight.png";
			}
			else{
				this.config.value = "ON";
				Lightimg1.src = "modules/HomeModule/graylight.png";
			}
		});

		items2.forEach(element => {
			if (element.value == "ON"){
				this.config.value2 = "OFF";
				Gasimg.src = "modules/HomeModule/gason.png";
			}
			else{
				this.config.value2 = "ON";
				Gasimg.src = "modules/HomeModule/gasoff.png";
			}
		});
		
		
		items3.forEach(element => {
			if (element.value == "ON"){
				this.config.value3 = "OFF";
				Lightimg2.src = "modules/HomeModule/yellowlight.png";
			}
			else{
				this.config.value3 = "ON";
				Lightimg2.src = "modules/HomeModule/graylight.png";
			}
		});
		
		wrapper.appendChild(Lightimg1);
		wrapper.appendChild(Lightimg2);
		wrapper.appendChild(Gasimg);
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
	},

	// Format a date string or return the input

	getFormattedValue: function (input) {

		var m = moment(input);

		if (typeof input === "string" && m.isValid()) {
// Show a formatted time if it occures today

			if (m.isSame(new Date(), "day") && m.hours() !== 0 && m.minutes() !== 0 && m.seconds() !== 0) {
				return m.format("HH:mm:ss");
			}
			else {
				return m.format("YYYY-MM-DD");
			}
		}
		else {
			return input;
		}
	},
	
	// 인체 감지 시, 현재 홈 상태를 파악하여 alert모듈로 notification을 보냄
	notificationReceived: function(notification, payload, sender) {
		  switch(notification) {
			    case "userDetected":
					if((this.config.value == "OFF") && (this.config.value2 == "ON") && (this.config.value3 == "ON"))
						//this.sendNotification("TTS_SAY", "거실 실내등이 켜져있습니다.");
						this.sendNotification("SHOW_ALERT", "거실 실내등이 켜져있습니다.");
						//console.log("거실 실내등이 켜져있습니다.");
					else if((this.config.value3 == "OFF") && (this.config.value2 == "ON") && (this.config.value == "ON"))
						//this.sendNotification("TTS_SAY", "1번 실내등이 켜져있습니다.");
						this.sendNotification("SHOW_ALERT", "1번 실내등이 켜져있습니다.");
						//console.log("1번 실내등이 켜져있습니다.");
					else if((this.config.value2 == "OFF") && (this.config.value0 == "ON") && (this.config.value3 == "ON"))
						//this.sendNotification("TTS_SAY", "가스밸브가 켜져있습니다.");
						this.sendNotification("SHOW_ALERT", "가스밸브가 켜져있습니다.");
					else if((this.config.value == "OFF") && (this.config.value3 == "OFF") && (this.config.value2 == "ON"))
						this.sendNotification("SHOW_ALERT", "거실 실내등과 1번 실내등이 켜져있습니다.");
					else if((this.config.value == "OFF") && (this.config.value2 == "OFF") && (this.config.value3 == "ON"))
						this.sendNotification("SHOW_ALERT", "거실 실내등과 가스밸브가 켜져있습니다.");
					else if((this.config.value2 == "OFF") && (this.config.value3 == "OFF") && (this.config.value == "ON"))
						this.sendNotification("SHOW_ALERT", "1번 실내등과 가스밸브가 켜져있습니다.");
					else if((this.config.value == "OFF") && (this.config.value3 == "OFF") && (this.config.value3 == "OFF") )
						this.sendNotification("SHOW_ALERT", "거실 실내등과 1번 실내등, 가스밸브가 켜져있습니다.");
			      	break;
				case "SHOW_ALERT":
					console.log("gdgd");
		  }
	},

});
