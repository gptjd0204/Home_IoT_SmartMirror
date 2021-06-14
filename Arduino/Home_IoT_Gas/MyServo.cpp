#include "MyServo.h"

MyServo::MyServo(int pin) {
  this->pin = pin;
  init();
}
void MyServo::init() {
  //pinMode(pin, OUTPUT);
  servo.attach(pin);
  servo.write(90);
  state = OFF;
  mode = DOOR;
}

void MyServo::on() {
  state = ON;
}

void MyServo::off() {
  state = OFF;
}

void MyServo::mirrorMode() {
  mode = MIRROR;
}

void MyServo::freeMode() {
  mode = FREE;
}

void MyServo::doorMode() {
  mode = DOOR;
}

// 서보모터 컨트롤
void MyServo::control(int level) {
  int po;
  if(level < 90) {
    for(po = 90; po >= level; po--){
      servo.write(po);
      delay(30);
    }
  } else {
    for(po = 0; po <= level; po++){
      servo.write(po);
      delay(30);
    }
  }
  delay(300);
}

byte MyServo::getState() {
  return state;
}

byte MyServo::getMode() {
  return mode;
}
