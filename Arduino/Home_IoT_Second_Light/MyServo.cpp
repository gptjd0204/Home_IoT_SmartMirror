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
}

void MyServo::on() {
  state = ON;
}

void MyServo::off() {
  state = OFF;
}

void MyServo::control(int level) {
  int po;
  if(level < 90) {
    for(po = 90; po >= level; po--){
      servo.write(po);
      delay(10);
    }
    /*
    for(po = level; po <= 90; po++) {
      servo.write(po);
      delay(50);
    }*/
  } else {
    for(po = 90; po <= level; po++){
      servo.write(po);
      delay(10);
    }
    /*
    for(po = level; po >= 90; po--) {
      servo.write(po);
      delay(50);
    }*/
  }
  servo.write(90);
  delay(300);
}

byte MyServo::getState() {
  return state;
}
