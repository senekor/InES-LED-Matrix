NeoPixelMatrix.initializeMatrix(DigitalPin.P0, 10)
basic.forever(function () {
    NeoPixelMatrix.clear()
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        `), 0xffffff)
    basic.pause(500)
    NeoPixelMatrix.clear()
    NeoPixelMatrix.showImage(NeoPixelMatrix.matrix8x8(`
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        # # # # # # # #
        `), 0x00ff00)
    basic.pause(500)
})
