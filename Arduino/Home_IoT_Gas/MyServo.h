#include <Servo.h>
#include <Arduino.h>

#define OFF 0
#define ON 1
#define DOOR 2
#define FREE 3
#define MIRROR 4

class MyServo{
  private:
    Servo servo;
    int pin;
    byte state;
    byte mode;

  public:
    MyServo(int pin);
    void init();
    void on();
    void off();
    void mirrorMode();
    void doorMode();
    void freeMode();
    void control(int level);
    byte getState();
    byte getMode();
};
