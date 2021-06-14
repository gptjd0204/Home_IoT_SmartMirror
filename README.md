# Home_IoT_SmartMirror (홈 IoT 스마트 미러)

## 목차
[1. 홈 IoT 스마트 미러 구조도](#1-홈-IoT-스마트-미러-구조도)

[2. 홈 IoT 스마트 미러 주요 기능](#2-홈-IoT-스마트-미러-주요-기능)

[3. Arduino](#3-Arduino)

[4. AWS](#4-AWS)

[5. Android](#5-Android)

[6. Raspberry Pi](#6-Raspberry-Pi)

## 1. 홈 IoT 스마트 미러 구조도

![홈IoT스마트미러구조도](https://user-images.githubusercontent.com/71610969/121895983-c8d43300-cd5b-11eb-833a-a0fa72ac8a0b.JPG)
<br/>

## 2. 홈 IoT 스마트 미러 주요 기능

**1) 홈 상태 표시<br/>**
&nbsp;&nbsp;스마트 미러에 현재 집 내부에 상태를 홈 IoT 제어기기와 AWS를 통해 실시간으로 조회하여 표시해준다. <br/>
<br/>
**2) 시간, 날씨, 버스 도착 정보 표시<br/>**
&nbsp;&nbsp;스마트 미러에 현재 시간, 날짜, 버스 도착 정보를 OpenWeatherAPI, 버스API 등을 활용하여 실시간으로 조회하여 표시해준다.<br/>
<br/>
**3) 음성 인식을 통한 홈 제어<br/>**
&nbsp;&nbsp;스마트 미러 내부에 마이크가 탑재되어 있어 [거실 실내등 켜, 꺼], [1번 방 불 켜, 꺼], [가브밸브 켜, 꺼], [전부 꺼] 같은 명령어를 말하면 GoogleAssistant 음성 인식을 통해 홈 상태를 음성으로 쉽게 제어할 수 있다. <br/>
<br/>
**4) 외출 시, 홈 상태 경고 알림 <br/>**
&nbsp;&nbsp;사용자가 외출하기 위해 현관. 즉, 스마트 미러 앞에 서게 됐을 때, 집 내부 상태 중 무언가 켜져 있다면 미러에 경고창이 뜨고 미러에 탑재된 스피커를 통해 경고 음성이 나와 사용자에게 알려준다. 이를 통해 사용자는 집 안에 위험 및 에너지 낭비를 외출하기 전 방지할 수 있다.<br/>
<br/>
**5) 일정 알림 <br/>**
&nbsp;&nbsp;스마트 미러에 잊어서는 안되는 중요한 메모나 일정을 사용자가 앱을 통해 추가하면 스마트 미러 화면에 표시된다. 사용자는 외출하기 전, 미러에 표시된 메모를 확인할 수 있어 중요한 메모나 일정을 한번 더 상기시킬 수 있다.<br/>
<br/>
**6) 앱을 통한 스마트 미러 및 홈 제어 <br/>**
&nbsp;&nbsp;안드로이드 앱을 통해 외부에서 집 상태를 조회하고 제어할 수 있으며 실내등, 가스밸브의를 몇 번 사용하였는지 사용량과 언제 사용하였는지의 로그기록을 확인할 수 있다. 또, 미러 모드 변경을 통해 홈 IoT 스마트미러의 모드를 외출 시 경고 기능,  버스 도착 시간 정보 표시 기능 등 홈 IoT 스마트미러에 모든 기능이 포함되어 현관에서 사용할 수 있는 현관모드와  불필요한 기능을 빼고 간단하게 홈 상태를 조회하고 제어하는 기능만 포함하여 집 안 어느 곳에서나 사용할 수 있는 심플모드로 변경할 수 있다. 마지막으로 안드로이드 앱의 메모 추가 기능을 이용해 스마트 미러에 간단한 메모 또는 일정을 추가하거나 삭제할 수 있다.

## 3. Arduino

![홈IoT기기_내부](https://user-images.githubusercontent.com/71610969/121896205-00db7600-cd5c-11eb-8614-694721c8c17e.jpg)
<br/>

- 홈 IoT 제어 기기에 사용한 부품
  - ArduinoMKRWiFi1010
  - 서보 모터 : 실내등 및 가스밸브 제어
  - 배터리
  
### Home_IoT, Home_IoT_Second_Light (아두이노 소스코드)
**1) arduino_secrets.h<br/>**
&nbsp;와이파이를 연결하고 AWS의 인증서를 사용하여 AWS와 연동하는 코드<br/><br/>
**2) MyServo.h, MyServo.cpp<br/>**
&nbsp;서보 모터 연결, 홈 상태에 의한 정보 설정<br/><br/>
**3) Button.h, Button.cpp<br/>**
&nbsp;버튼을 이용한 서보모터 제어(현재 사용하지 않는 기능)<br/><br/>
**4) Home_IoT.ino, Home_IoT_Second_Light.ino<br/>**
&nbsp;AWS에 데이터를 보내고 받는 아두이노 코드로 AWS에서 받은 상태 정보를 이용하여 서보모터를 제어하여 실내등을 제어하고 상태 정보를 변경 <br/><br/>

### Home_IoT_Gas (아두이노 소스코드)
**1) arduino_secrets.h<br/>**
&nbsp;와이파이를 연결하고 AWS의 인증서를 사용하여 AWS와 연동하는 코드<br/><br/>
**2) MyServo.h, MyServo.cpp<br/>**
&nbsp;서보 모터 연결, 홈 상태에 의한 정보 설정<br/><br/>
**3) Button.h, Button.cpp<br/>**
&nbsp;버튼을 이용한 서보모터 제어(현재 사용하지 않는 기능)<br/><br/>
**4) Home_IoT_Gas.ino<br/>**
&nbsp;AWS에 데이터를 보내고 받는 아두이노 코드로 AWS에서 받은 상태 정보를 이용하여 서보모터를 제어하여 가스밸브를 제어하고 상태 정보를 변경 <br/><br/>

## 4. AWS
### 1. AWS IoT 설정
1. AWS IoT Core에서 'MyMKR1','MyMKR2','MyMKR3' 사물 생성
2. DynamoDB에 FirstLightLogging 테이블 생성
3. DynamoDB에 SecondLightLogging 테이블 생성
4. DynamoDB에 GasValveLogging 테이블 생성

### 2. AWS Lambda를 이용해 함수 생성
**1)	FirstLightLogDeviceLambdaProject, SecondLightLogDeviceLambdaProject, GasLogDeviceLambdaProject** <br/> 
– DynamoDB에 FirstLightLogging, SecondLightLogging, GasValveLogging에서 로그 정보를 조회<br/> <br/> 
**2)	RecordingFirstLightDataProject, RecordingSecondLightDataProject, RecordingGasValveDataProject** <br/> 
– 홈 상태가 변경되면(ON->OFF or OFF->ON) DynamoDB에FirstLightLogging, SecondLightLogging, GasValveLogging 테이블에 로그 정보 저장<br/> <br/> 
**3)	GetDeviceLambdaProject** <br/> 
– 홈 IoT 제어 기기의 상태 정보 조회(ON, OFF)<br/> <br/> 
**4)	UpdateDeviceLambdaProject** <br/> 
– 홈 IoT 제어 기기의 상태 정보 변경(ON, OFF)<br/> <br/> 

### 3. Rule 생성
AWS IoT Core에서 SNS를 보내기 위한 Rule과 DynamoDB에 상태 정보를 저장하기 위한 Rule 생성<br/>
1. SNS Rule
규칙(Rule)을 생성하고 다음 규칙 쿼리 설명문으로 설정
```
SELECT * FROM '$aws/things/SmartSAFE/shadow/update/accepted'
```
작업을 추가하여 *'메시지 데이터를 전달하는 Lambda 함수 호출'* 을 추가하고 앞서 ShockSNSLambda를 이용해 만든 Lambda 함수를 적용시킨다.

2. DynamoDB Logging Rule
규칙(Rule)을 생성하고 다음 규칙 쿼리 설명문으로 설정

```
SELECT *, 'SmartSAFE' as device FROM '$aws/things/SmartSAFE/shadow/update/documents'
```
작업을 추가하여 *'메시지 데이터를 전달하는 Lambda 함수 호출'* 을 추가하고 앞서 RecordingShockDataLambdaJavaProject와 RecordingOpenDataLambdaProject를 이용해 만든 Lambda 함수를 적용시킨다.

### 4. RestAPI 생성

API Gateway에서 다음과 같이 RestAPI 생성<br/>

<br/>

**1) /devices/{device}<br/>**
  -	GET: 홈 IoT 스마트미러(아두이노)의 홈 상태 정보를 조회하는 RestAPI - [GetDeviceLambdaProject를 이용해 만든 Lambda 함수를 적용]<br/>
  
  매핑 템플릿 설정 - [application/json]
  ```
  {
  "device": "$input.params('device')"
  }
  ```
  -	PUT: 홈 IoT 스마트미러(아두이노)의 홈 상태 정보를 변경하는 RestAPI - [UpdateDeviceLambdaProject 이용해 만든 Lambda 함수를 적용]<br/>
<br/>
  
  매핑 템플릿 설정 - [application/json]
  ```
  #set($inputRoot = $input.path('$'))
{
    "device": "$input.params('device')",
    "tags" : [
    ##TODO: Update this foreach loop to reference array from input json
        #foreach($elem in $inputRoot.tags)
        {
            "tagName" : "$elem.tagName",
            "tagValue" : "$elem.tagValue"
        } 
        #if($foreach.hasNext),#end
        #end
    ]
}
  ```

**2) /devices/{device}/firstlightlog<br/>**
  -	GET: DynamoDB에서 FirstLightLogging 테이블에 있는 내용을 조회하는 RestAPI - [FirstLightLogDeviceLambdaProject를 이용해 만든 Lambda 함수를 적용]<br/>
<br/>
  
  매핑 템플릿 설정 - [application/json]
  ```
{
  "device": "$input.params('device')",
  "from": "$input.params('from')",
  "to":  "$input.params('to')"
}
  ```

**3) /devices/{device}/secondlightlog<br/>**
  -	GET: DynamoDB에서 SecondLightLogging 테이블에 있는 내용을 조회하는 RestAPI - [SecondLightLogDeviceLambdaProject를 이용해 만든 Lambda 함수를 적용]<br/>
<br/>
  
  매핑 템플릿 설정 - [application/json]
  ```
{
  "device": "$input.params('device')",
  "from": "$input.params('from')",
  "to":  "$input.params('to')"
}
  ```
  
**4) /devices/{device}/gasvalvelog<br/>**
  -	GET: DynamoDB에서 GasValveLogging 테이블에 있는 내용을 조회하는 RestAPI - [GasLogDeviceLambdaProject를 이용해 만든 Lambda 함수를 적용]<br/>
<br/>
  
  매핑 템플릿 설정 - [application/json]
  ```
{
  "device": "$input.params('device')",
  "from": "$input.params('from')",
  "to":  "$input.params('to')"
}
  ```

## 5. Android

### 1. UI Java Code

**1) LoadingActivity.java, MainActivity.java**<br/>
  - 로딩 화면
  - 안드로이드 홈 화면
  - 버튼을 클릭하면 다음 Activity에 RestAPI URL 전달
  
![1_앱로딩화면](https://user-images.githubusercontent.com/71610969/121896585-6c254800-cd5c-11eb-8c6a-a18d86e9fd43.jpg)
![2_앱홈화면](https://user-images.githubusercontent.com/71610969/121896595-6e87a200-cd5c-11eb-9de2-7cadfaf465dc.jpg)
<br/> [Home_IoT_SmartMirror 로딩 및 홈 화면]<br/><br/>

**2) HomeIotActivity.java** <br/>
  - 홈 상태 조회 및 제어 홈 화면
  - 버튼을 클릭하면 다음 Activity에 RestAPI URL 전달

![3_홈IoT상태조회](https://user-images.githubusercontent.com/71610969/121896683-8a8b4380-cd5c-11eb-8252-22cb4e8bfb8e.jpg)

<br/> [홈 상태 조회 및 제어 홈 화면]<br/><br/>


**3) HomeFirstLightActivity.java, HomeSecondLightActivity.java, HomeGasActivity.java** <br/>
  - 홈 상태 조회 및 제어 화면
  - 켜기를 누르면 홈 상태 ON, 끄기를 누르면 홈 상태 OFF


<br/> [홈 상태 조회 및 제어 화면]<br/><br/>

<br/> [켜기 클릭 시]<br/><br/>

**3) HomeIotUsageActivity.java** <br/>
  - 홈 IoT 사용량 조회 홈 화면
  - 버튼을 클릭하면 다음 Activity에 RestAPI URL 전달

<br/> [홈 IoT 사용량 조회 홈 화면]<br/><br/>


**4) HomeLightUsageActivity.java, HomeSecondLightUsageActivity.java, HomeGasUsageActivity.java** <br/>
  - 홈 IoT 사용량 조회 화면
  - 월별로 홈 사용량을 조회하여 표시

<br/> [홈 IoT 사용량 조회 화면]<br/><br/>

<br/> [월별 홈 IoT 사용량 조회]<br/><br/>


**5) HomeLightLogActivity.java, HomeSecondLightLogActivity.java, HomeGasLogActivity.java** <br/>
  - 홈 IoT 사용 시간 로그 조회 화면
  - 일별, 월별로 홈 IoT 사용 시간 로그를 조회하여 표시

<br/> [홈 IoT 사용 시간 로그 조회 화면]<br/><br/>

<br/> [일별 홈 IoT 사용 시간 로그 조회]<br/><br/>


**6) MirrorModeActivity.java** <br/>
  - 스마트 미러 모드 변경 화면
  - 현재 스마트 미러의 모드가 무엇인지 조회
  - 설정에서 모드 변경 가능

<br/> [스마트 미러 모드 변경 화면]<br/><br/>

<br/> [스마트 미러 모드 변경]<br/><br/>

**7) AddMemoActivitiy.java** <br/>
  - 메모 추가 및 삭제 화면
  - 스마트 미러에 메모를 추가하거나 삭제

<br/> [메모 추가 및 삭제 화면]<br/><br/>

<br/> [스마트 미러 메모 추가]<br/><br/>

**8) MyYearMonthPickerDialog.java** <br/>
  - 년도와 월만 선택할 수 있는 DatePickerDialog
  - 월별 시간 조회를 하기 위해 생성

<br/>

### 2. apicall Java Code

**1) GetLightShadow.java, GetGasShadow.java**<br/>
  - API URL에서 얻어온 json 코드를 바탕으로 현재 홈 상태 확인

**2) GetModeShadow.java**<br/>
  - API URL에서 얻어온 json 코드를 바탕으로 현재 미러 모드 확인
  
**3) UpdateShadow.java**<br/>
  - 앱에서 API URL을 통해 AWS에 DeviceShadow를 변경시켜 홈 상태 변경
  
**4) GetLightLog.java, GetGasLog.java**<br/>
  - API URL에서 얻어온 json 코드를 바탕으로 DynamoDB에 있는 FirstLightLogging, SecondLightLogging, GasValveLogging에서 데이터 조회

**5) GetLightUsage.java, GetGasUsage.java**<br/>
  - API URL에서 얻어온 json 코드를 바탕으로 DynamoDB에 있는 FirstLightLogging, SecondLightLogging, GasValveLogging에서 데이터를 조회하고 이 로그 정보를 통해 사용량으로 계산

**6) GetMemo.java**<br/>
  - URL의 GET request를 이용하여 스마트 미러(라즈베리파이)에 메모 정보 추가 및 삭제
  
<br/>
