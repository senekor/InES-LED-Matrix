NeoPixelMatrix.initializeMatrix(DigitalPin.P0, 100)
NeoPixelMatrix.debugEnable(false)
while (true) {
    NeoPixelMatrix.movingImage(
    NeoPixelMatrix.matrix8x8(`
        . . . # . . . .
        . . . # . . . .
        . . . # . . . .
        # # # # # # # #
        . . . # . . . .
        . . . # . . . .
        . . . # . . . .
        . . . # . . . .
        `),
    0x00ffff,
    116,
    Direction.Left
    )
}
