#include <Arduino.h>

#define OFF 0
#define ON 1

class Button{
  private:
    int pin;
    byte state;
    byte msg;

  public:
    Button(int pin);
    void init();
    void on();
    void off();
    void start();
    void wait();
    byte getState();
    byte getMsg();
};
