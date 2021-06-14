/*
  AWS IoT WiFi

  This sketch securely connects to an AWS IoT using MQTT over WiFi.
  It uses a private key stored in the ATECC508A and a public
  certificate for SSL/TLS authetication.

  It publishes a message every 5 seconds to arduino/outgoing
  topic and subscribes to messages on the arduino/incoming
  topic.

  The circuit:
  - Arduino MKR WiFi 1010 or MKR1000

  The following tutorial on Arduino Project Hub can be used
  to setup your AWS account and the MKR board:

  https://create.arduino.cc/projecthub/132016/securely-connecting-an-arduino-mkr-wifi-1010-to-aws-iot-core-a9f365

  This example code is in the public domain.
*/

#include <ArduinoBearSSL.h>
#include <ArduinoECCX08.h>
#include <ArduinoMqttClient.h>
#include <WiFiNINA.h> // change to #include <WiFi101.h> for MKR1000

#include "arduino_secrets.h"


#include <ArduinoJson.h>

// **가스밸브 제어
#define SERVO_PIN 3
#include "MyServo.h"

// **버튼 제어 (현재는 사용하지 않음)
#define BUTTON_PIN 0
#include "Button.h"

/////// Enter your sensitive data in arduino_secrets.h
const char ssid[]        = SECRET_SSID;
const char pass[]        = SECRET_PASS;
const char broker[]      = SECRET_BROKER;
const char* certificate  = SECRET_CERTIFICATE;

WiFiClient    wifiClient;            // Used for the TCP socket connection
BearSSLClient sslClient(wifiClient); // Used for SSL/TLS connection, integrates with ECC508
MqttClient    mqttClient(sslClient);

unsigned long lastMillis = 0;


// 가스밸브 제어
MyServo servo(SERVO_PIN);
Button button(BUTTON_PIN);

int btn = 0;
int btnPress = 0;

const char* buttonState = (button.getState() == ON)? "ON" : "OFF";

void setup() {
  pinMode(5, OUTPUT);
  Serial.begin(115200);
  //while (!Serial);

  if (!ECCX08.begin()) {
    Serial.println("No ECCX08 present!");
    while (1);
  }

  ArduinoBearSSL.onGetTime(getTime);

  sslClient.setEccSlot(0, certificate);

  mqttClient.onMessage(onMessageReceived);    // MQTT Client로부터 메시지를 받는다.
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();  // WiFi를 연결한다.
  }

  if (!mqttClient.connected()) {
    // MQTT client is disconnected, connect
    connectMQTT();  // MQTT Client와 연결한다.
  }

  // poll for new MQTT messages and send keep alives
  mqttClient.poll();

  // 5초마다 아두이노(디바이스)의 상태 정보를 얻어와 AWS IoT에 보낸다.
  if (millis() - lastMillis > 5000) {
    lastMillis = millis();
    char payload[512];
    getDeviceStatus(payload); // 아두이노(디바이스)의 상태 정보를 얻어온다.
    sendMessage(payload);
  }
}

unsigned long getTime() {
  // get the current time from the WiFi module  
  return WiFi.getTime();
}

void connectWiFi() {
  Serial.print("Attempting to connect to SSID: ");
  Serial.print(ssid);
  Serial.print(" ");

  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  Serial.println();

  Serial.println("You're connected to the network");
  Serial.println();
}

// MQTT Client와 연결한다.
void connectMQTT() {
  Serial.print("Attempting to MQTT broker: ");
  Serial.print(broker);
  Serial.println(" ");

  while (!mqttClient.connect(broker, 8883)) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  Serial.println();

  Serial.println("You're connected to the MQTT broker");
  Serial.println();

  // $aws/things/MyMKR1/shadow/update/delta 구독
  mqttClient.subscribe("$aws/things/MyMKR1/shadow/update/delta");
}

// 아두이노의 상태 정보를 얻어온다.
void getDeviceStatus(char* payload) {

  // ** 실내등 제어
  const char* servoState = (servo.getState() == ON)? "ON" : "OFF";
  // ** 메시지를 받았는지 제어
  const char* msgState = (button.getMsg() == ON)? "START" : "WAIT";
  // ** 미러 모드 변경
  const char* mirrorMode = (servo.getMode() == DOOR)? "DOOR" : "FREE";

  // MQTT의 내용에 따라 서보모터 제어
   if(msgState == "START") {
    if(servoState == "ON") {
         servo.on();
         servo.control(0);
     } else if(servoState == "OFF") {
        servo.off();
        servo.control(90);
     }
     button.wait();
     delay(300);
   }
         
  servoState = (servo.getState() == ON)? "ON" : "OFF";
 
  // $aws/things/MyMKR1/shadow/update topic으로 payload 전송
  sprintf(payload,"{\"state\":{\"reported\":{\"SERVO_STATE\":\"%s\",\"MIRROR_MODE\":\"%s\"}}}",servoState, mirrorMode);
}

// MQTT Client에 메시지를 보낸다.
void sendMessage(char* payload) {
  char TOPIC_NAME[]= "$aws/things/MyMKR1/shadow/update";
  
  Serial.print("Publishing send message:");
  Serial.println(payload);
  mqttClient.beginMessage(TOPIC_NAME);
  mqttClient.print(payload);
  mqttClient.endMessage();
}

// AWS IoT로부터 메시지를 받는다.
void onMessageReceived(int messageSize) {
  // we received a message, print out the topic and contents
  Serial.print("Received a message with topic '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");

  // store the message received to the buffer
  char buffer[512] ;
  int count=0;
  while (mqttClient.available()) {
     buffer[count++] = (char)mqttClient.read();
  }
  buffer[count]='\0'; // 버퍼의 마지막에 null 캐릭터 삽입
  Serial.println(buffer);
  Serial.println();
    
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, buffer);
  JsonObject root = doc.as<JsonObject>();
  JsonObject state = root["state"];
  const char* servoState = state["SERVO_STATE"];
  //servoState = state["SERVO_STATE"];
  const char* mirrorMode = state["MIRROR_MODE"];
  
  Serial.println(servoState);
  Serial.println(mirrorMode);
  
  char payload[512];

 
  // AWS로부터 메시지를 받을 때 SERVO_STATE가 ON이면 가스밸브 켜기, OFF이면 가스밸브 끄기
   if (strcmp(servoState,"ON")==0) {
    servo.on();
    button.start();
    sprintf(payload,"{\"state\":{\"reported\":{\"SERVO_STATE\":\"%s\"}}}","ON");
    sendMessage(payload);
    
  } else if (strcmp(servoState,"OFF")==0) {
    servo.off();
    button.start();
    sprintf(payload,"{\"state\":{\"reported\":{\"SERVO_STATE\":\"%s\"}}}","OFF");
    sendMessage(payload);
  }

  // AWS로부터 메시지를 받을 때 MIRROR_MODE 상태에 따라 모드 변경
  if (strcmp(mirrorMode,"DOOR")==0) {
    servo.doorMode();
    sprintf(payload,"{\"state\":{\"reported\":{\"MIRROR_MODE\":\"%s\"}}}","DOOR");
    sendMessage(payload);
  } else if (strcmp(mirrorMode,"FREE")==0) {
    servo.freeMode();
    sprintf(payload,"{\"state\":{\"reported\":{\"MIRROR_MODE\":\"%s\"}}}","FREE");
    sendMessage(payload);
  }
}
