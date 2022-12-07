from time import sleep
import board
import adafruit_ds3502
from adafruit_circuitplayground import cp

# i2c = board.I2C()  # uses board.SCL and board.SDA
i2c = board.STEMMA_I2C()  # For using the built-in STEMMA QT connector on a microcontroller
ds3502 = adafruit_ds3502.DS3502(i2c)

def percentage_to_wipervalue(pct):
    assert(0 <= pct and pct <= 1.0)
    max_wiper_value = 65535
    return pct * max_wiper_value

pct = 0.50
pct_step = 0.10
ds3502.wiper = percentage_to_wipervalue(pct) # Initial Value
step = percentage_to_wipervalue(pct_step) # Value to increment/decrement by
delay = 0.1 # May need to play with this

while True:
    # Left button decrements intensity
    if cp.button_a and pct > 0:
        pct -= pct_step
        ds3502.wiper -= step
        cp.pixels[0:5] = (0,255,0)
        sleep(0.1)
        cp.pixels[0:5] = (0,0,0)
    # Right button increments intensity
    if cp.button_b and pct < 1.0:
        pct += pct_step
        ds3502.wiper += step
        cp.pixels[5:10] = (0,0,255)
        sleep(0.1)
        cp.pixels[5:10] = (0,0,0)