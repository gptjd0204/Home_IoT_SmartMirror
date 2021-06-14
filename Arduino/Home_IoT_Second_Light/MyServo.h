#include <Servo.h>
#include <Arduino.h>

#define OFF 0
#define ON 1

class MyServo{
  private:
    Servo servo;
    int pin;
    byte state;

  public:
    MyServo(int pin);
    void init();
    void on();
    void off();
    void control(int level);
    byte getState();
};
