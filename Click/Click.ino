int motorPin = 3;
int buttonPin = 0;
int buttonState = 0;

void setup()
{
  pinMode(motorPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
  digitalWrite(motorPin, LOW);
}
void loop()
{
  Serial.print(F("Motor State: "));
  Serial.println(digitalRead(motorPin));
  Serial.print(F("Button State: "));
  Serial.println(analogRead(buttonPin));
  buttonState = analogRead(buttonPin);
  if(buttonState > 512)
  {
    digitalWrite(motorPin, HIGH);  
  }
  else
  {
    digitalWrite(motorPin, LOW);  
  }  
  delay(1000);
}