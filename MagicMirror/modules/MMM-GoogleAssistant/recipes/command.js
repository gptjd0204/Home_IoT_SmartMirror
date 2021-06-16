
// 구글 어시스턴트로 명령할 수 있는 스마트미러 명령어 모음
var recipe = {
	transcriptionHooks: {
	  "LED1_ON": {
	      pattern: "거실 불 켜",
	      command: "LED1_ON" 
	  },
	  "LED1_OFF": {
	      pattern: "거실 불 꺼",
	      command: "LED1_OFF" 
	  },
	  "LED2_ON": {
	      pattern: "1번 방 불 켜",
	      command: "LED2_ON" 
	  },
	  "LED2_OFF": {
	      pattern: "1번 방 불 꺼",
	      command: "LED2_OFF" 
	  },
	  "GAS_ON": {
	      pattern: "가스 밸브 켜",
	      command: "GAS_ON" 
	  },
	  "GAS_OFF": {
	      pattern: "가스 밸브 꺼",
	      command: "GAS_OFF" 
	  },
	  "ALL_OFF": {
	      pattern: "전부 꺼",
	      command: "ALL_OFF" 
	  },
	  "SCREEN_TURNOFF": {
	    pattern: "거울 모드",
	    command: "SCREEN_TURNOFF"
	  },
	  "SCREEN_TURNON": {
	    pattern: "스마트 미러 모드",
	    command: "SCREEN_TURNON"
	  }
  },
      
  commands: {
    "test": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("SCREEN_ONOFF", 1) //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        },
      }
    },
    
    "LED1_ON": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("LED1_ON") //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        }
      }
    },
    "LED1_OFF": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("LED1_OFF") //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        }
      }
    },
    "LED2_ON": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("LED2_ON") //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        }
      }
    },
    "LED2_OFF": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("LED2_OFF") //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        }
      }
    },
    "GAS_ON": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("GAS_ON") //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        }
      }
    },
    "GAS_OFF": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("GAS_OFF") //test 명령어가 입력되면 alert에 만들어둔 ONE이라는 주소의 sendNotification으로 1 전송
        }
      }
    },
    "ALL_OFF": {
      moduleExec: {
        module: (param) => {
            this.sendNotification("GAS_OFF"),
	     this.sendNotification("LED1_OFF") 
	     this.sendNotification("LED2_OFF") 
        }
      }
    },
    "SCREEN_TURNOFF": {
		moduleExec: {
			module: (param) =>{
				this.sendNotification("SCREEN_ONOFF", 0)
			}
		}
    },
    "SCREEN_TURNON": {
      moduleExec: {
			module: (param) =>{
				this.sendNotification("SCREEN_ONOFF", 1)
			}
		}
    }
    
  }
}

exports.recipe = recipe
