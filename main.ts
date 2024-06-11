NeoPixelMatrix.initializeMatrix(DigitalPin.P0, 255)
basic.forever(function () {
    for (let Index = 0; Index <= 7; Index++) {
        for (let Index2 = 0; Index2 <= 7; Index2++) {
            NeoPixelMatrix.clear()
            NeoPixelMatrix.setPixel(Index, Index2, 0xff0080)
            basic.pause(100)
        }
    }
})
