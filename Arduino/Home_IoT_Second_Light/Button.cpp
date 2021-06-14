#include "Button.h"

Button::Button(int pin) {
  this->pin = pin;
  init();
}
void Button::init() {
  pinMode(pin, INPUT_PULLUP);
  state = OFF;
  msg = OFF;
}

void Button::on() {
  state = ON;
}

void Button::off() {
  state = OFF;
}

void Button::start() {
  msg = ON;
}

void Button::wait() {
  msg = OFF;
}

byte Button::getState() {
  return state;
}

byte Button::getMsg() {
  return msg;
}
