/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "0.0.0.0", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	electronOptions: {
		webPreferences: {
			webviewTag: true
		}
	},
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: [], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "ko",
	logLevel: ["INFO", "LOG", "WARN", "ERROR", "DEBUG"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		// 스마트 미러 모듈 동적으로 변경(미러 모드 변경 시, 사용)
		{
			module: "MMM-Dynamic-Modules",
		},
		// 외출할 때, 위험요소 감지 시 경고 창 알림
		{
			module: "alert",
		},
		// 버스 도착 정보 표시
		{
			module: "bus",
			position: "top_right"
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		// 현재 시간 정보 표시
		{
			module: "clock",
			position: "top_left",
		},
		// 현재 날씨 정보 표시
		{
			module: "currentweather",
			position: "top_right",
			header: "현재 날씨",
			config: {
				location: "Seoul",
				locationID: "1835847", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "6bd382275e05e28a8ee6fe05dc7116ec"
			}
		},
		// 집  안 도면으로 홈 상태 표시
		{
			module: "HomeModule",
			position: "bottom_center",
			config: {
				url: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR2",
				url1: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR1",
				url2: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR3",
				arrayName: "HOME_STATE"
			}
		},
		// 현재 거실 실내등 상태 표시
		{
			module: "HomeLightModule",

			position: "bottom_left",

			header: "거실 실내등 상태",

			config: {
				url: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR2",

				arrayName: "HOME_STATE"
			}
		},
		// 현재 1번방 실내등 상태 표시
		{
			module: "HomeLightModule",

			position: "bottom_left",

			header: "1번방 실내등 상태",

			config: {
				url: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR3",

				arrayName: "HOME_STATE"
			}
		},
		// 현재 가스밸브 상태 표시
		{

			module: "HomeGasModule",

			position: "bottom_left",

			header: "가스밸브 상태",

			config: {

				url: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR1",

				arrayName: "HOME_STATE"

			}
		},
		// 미러 앞 인체 감지 후, 경고 알림 보냄
		{
			module: "PIRSensor",
			config:{
				sensorPin:22,
				powerSavingDelay:300,
				preventHDMITimeout:10,
			}
		},
		// 스마트 미러 음성인식
		{
			module: "MMM-GoogleAssistant",
			position: "top_left",
			//position: "lower_third",
			configDeepMerge:true,
			config: {
				assistantConfig: {
					lang: "ko-KR",
					latitude:37.33,
					lognitude:126.59,
				},
				micConfig:{
					recorder: "arecord",
					device: "plughw:2",
				},/*
				snowboy:{
					audioGain: 2.0,
					Frontend: true,
					Model: "jarvis",
					Sensitivity:null
				},*/
				NPMCheck: {
				      useChecker: false,
				      delay: 10 * 60 * 1000,
				      useAlert: false
				   },
				  recipes: [ "command.js" ]	// 명령어용 js파일 (recipe 폴더에 존재)
			}
		},
		// 구글어시스턴트 명령어 사용 시 필요한 모듈
		{
			module: "MMM-Snowboy",
			configDeepMerge: true,
			config: {
				micConfig: {
					device: "plughw:2",
				}
			}
		},
		// 음성으로 경고 알림
		/*{
			module: "MMM-GoogleTTS",
			config: {}
		},*/
		// 스마트 미러에 사용자가 설정한 메모 또는 일정 표시
		{
			module:'MMM-Memo',
			position: 'bottom_right',
			class : 'default everyone',
			config : {
				memoTitle: "일정",
			}
		},
		// 모드 변경 시 사용되는 모듈
		{

			module: "ModeModule",
			position: "bottom_right",
			config: {
				url: "https://peaypv7rkd.execute-api.ap-northeast-2.amazonaws.com/homeIoT/devices/MyMKR1",
				arrayName: "HOME_STATE"
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
