NeoPixelMatrix.initializeMatrix(DigitalPin.P0, 154)
basic.forever(function () {
    NeoPixelMatrix.clear()
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . # # . # # .
        `), 0x65471f)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        # # . . . . # #
        # . . . . . . .
        # # . . . . . .
        # . . . . . . .
        # # . . . . . #
        . . . . . . . #
        # . . . . . . .
        # # . . # . . #
        `), 0x000000)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . # # . . . .
        . . # # . . . .
        . . . . # # # .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        `), 0xffffff)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . # . . . .
        . . . . # # . .
        . . . . # # . .
        . . . . . . . .
        `), 0xff9da5)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . # . . . . .
        . # . . . . . .
        . . . . . . . .
        . # . . . . . .
        . . # . . . . .
        . # . . . . . .
        . . . . . . . .
        . . . . . . . .
        `), 0xff8000)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . # # # . .
        . . # . # # # #
        . . . . # # # #
        . . . . # # # #
        . . . . . . . .
        # . # # . . # .
        . # # # . . # #
        . . . . . . . .
        `), 0x00ff00)
    basic.pause(5000)
    NeoPixelMatrix.clear()
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        # . . . . . . .
        . # . . . . . .
        . . . . . # . .
        . . . . # # . .
        . . . # # . . .
        . . . . . . . .
        `), neopixel.rgb(255, 210, 0))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . # . . .
        . . . # # # . .
        . . . # . . . .
        # . . # # # . .
        . # . # # . . .
        . . # # . . . .
        . . # . . . . .
        . . # . . . . .
        `), neopixel.rgb(201, 90, 0))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . # . # .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        `), neopixel.rgb(0, 120, 10))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . # . .
        . . . . . . # .
        . # . . . # . .
        . . . . . . # .
        . . . . . . . .
        . # . . . . # .
        . . . . . # . #
        . . . . . # . .
        `), neopixel.rgb(174, 74, 0))
    basic.pause(5000)
    NeoPixelMatrix.clear()
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . # . . . .
        . . # # # . . .
        . . . # . . . .
        # . . . . . . #
        . # . . . . # .
        . . . . . . . .
        . . # . . # . .
        . . # . . . # .
        `), neopixel.rgb(60, 251, 255))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . # . .
        . . # . . # . .
        . . . . . . # .
        . . . # # . # .
        . . . . . . . .
        `), neopixel.rgb(74, 54, 0))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . # # . . .
        . . # # # # . .
        . . . . . . . .
        . . . . . . . .
        `), neopixel.rgb(254, 207, 94))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . # . . .
        . . . . . # . .
        . . . . . # . .
        . . . # # . . .
        . . . . . . . .
        . . . . . . . #
        . . . . . . . #
        . . . . . . . .
        `), neopixel.rgb(56, 121, 122))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . # . # . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        `), 0xffffff)
    basic.pause(5000)
    NeoPixelMatrix.clear()
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . # # . . . . .
        # . # . . . . .
        # . . . # # . #
        # . . . . # # #
        # # # # # . # .
        . # # # # . . .
        . # # # . . # .
        . . . . . . . .
        `), neopixel.rgb(100, 10, 138))
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . # . #
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        `), 0xffffff)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . # .
        . . . . . . . .
        . . . . . . . .
        `), 0xff0000)
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . # . . .
        . . . . . . . .
        . . . . . # . #
        . . . . # # . .
        . # . # . . # .
        `), 0x65471f)
    basic.pause(5000)
})
