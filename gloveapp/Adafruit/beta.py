import board
import touchio
import neopixel
from digitalio import DigitalInOut, Direction

num_pixels = 10

touch_pad = board.A1  # A1 is selected capacitive touch port
touch = touchio.TouchIn(touch_pad)
pixels = neopixel.NeoPixel(board.NEOPIXEL, num_pixels, auto_write=False)
buzzer = DigitalInOut(board.A2)
# buzzer.switch_to_output(False, PUSH_PULL)
buzzer.direction = Direction.OUTPUT
buzzer.value = False

def color_change(color):
    for i in range(num_pixels):
        pixels[i] = color
    pixels.show()

while True:
    if touch.value:
        buzzer.value = True
        color_change((0, 0, 10))
    else:
        buzzer.value = False
        color_change((10, 0, 0))