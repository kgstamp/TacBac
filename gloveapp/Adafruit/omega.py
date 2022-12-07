import board
import touchio
import neopixel
from digitalio import DigitalInOut, Direction
from time import sleep
import adafruit_ds3502
from adafruit_circuitplayground import cp
from analogio import AnalogIn

num_pixels = 10
pixels = neopixel.NeoPixel(board.NEOPIXEL, num_pixels, auto_write=False)

# Potentiometer Code

i2c = board.STEMMA_I2C()  # For using the built-in STEMMA QT connector on a microcontroller
# i2c = board.I2C()  # uses board.SCL and board.SDA
ds3502 = adafruit_ds3502.DS3502(i2c)
wiper_output = AnalogIn(board.A1)

def percentage_to_wipervalue(pct):
    assert(0 <= pct and pct <= 1.0)
    max_wiper_value = 127
    return pct * max_wiper_value

rest_pct = 1.0
pct = 0.5
pct_step = 0.10
ds3502.wiper = percentage_to_wipervalue(rest_pct) # Initial Value
step = percentage_to_wipervalue(pct_step) # Value to increment/decrement by
delay = 0.1 # May need to play with this

# Capactive Touch and Vibrations
finger_in = board.A2
touch = touchio.TouchIn(finger_in)

# # Index Finger
# index_out = board.A1 
# index_in = board.A2

# touch_index = touchio.TouchIn(index_in)
# buzzer_index = DigitalInOut(index_out)

# buzzer_index.direction = Direction.OUTPUT
# buzzer_index.value = False

# # Middle Finger
# middle_out = board.A6
# middle_in = board.A3

# touch_middle = touchio.TouchIn(middle_in)
# buzzer_middle = DigitalInOut(middle_out)

# buzzer_middle.direction = Direction.OUTPUT
# buzzer_middle.value = False

def color_change(color):
    for i in range(num_pixels):
        pixels[i] = color
    pixels.show()

while True:
    if touch.value:
        ds3502.wiper = percentage_to_wipervalue(pct)
        # buzzer_index.value = True
        sleep(0.5)
        ds3502.wiper = percentage_to_wipervalue(rest_pct)
        # buzzer_index.value = False
    else:
        ds3502.wiper = percentage_to_wipervalue(rest_pct)
        # buzzer_index.value = False
        
    
    # if touch_middle.value:
    #     buzzer_index.value = True
    #     sleep(0.2)
    #     buzzer_index.value = False
    # else:
    #     buzzer_index.value = False
    

    # Left button decrements intensity
    if cp.button_a and pct > 0:
        pct -= pct_step
        ds3502.wiper -= step
        cp.pixels[0:5] = (0,255,0)
        sleep(0.1)
        cp.pixels[0:5] = (0,0,0)
    # Right button increments intensity
    if cp.button_b and pct < 0.8:
        pct += pct_step
        ds3502.wiper += step
        cp.pixels[5:10] = (0,0,255)
        sleep(0.1)
        cp.pixels[5:10] = (0,0,0)
