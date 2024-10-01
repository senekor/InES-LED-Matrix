namespace NeoPixelMatrix {
    let strip: neopixel.Strip;
    let matrixWidth = 8;
    let matrixHeight = 8;
    let counter = 0;
    let result: number[][] = [];
    let binaryArray: number[] = [];
    let finalResult: number[][] = [];
    let output: number[][] = [];
    let charData: number[] = [];
    let charMatrix: number[][] = [];
    let im: Image;
    let textArray: number[][] = [];
    let totalWidth: number = 0;
    let index: number = 0;

    //% block="initialize NeoPixel matrix with pin $pin and brightness $brightness"
    //% brightness.min=0 brightness.max=255
    export function initializeMatrix(pin: DigitalPin, brightness: number): void {
        strip = neopixel.create(pin, matrixWidth * matrixHeight, NeoPixelMode.RGB);
        let defaultBrightness = brightness;
        strip.setBrightness(brightness);
        clear();
        serial.redirectToUSB();
        serial.writeLine(`initializeMatrix: Matrix init: Pin = ${pin}, Brightness = ${brightness}`);
    }

    //% block="clear NeoPixel matrix"
    export function clear(): void {
        if (strip) {
            strip.clear();
            strip.show();
        }
    }

    //% block="set Brightness $brightness"
    export function setBrightness(brightness: number): void {
        strip.setBrightness(brightness);
        strip.show();
        serial.writeLine(`setBrightness: Brightness is set to = ${brightness}`);
    }

    //% block="set pixel at x $x y $y to color $color"
    //% x.min=0 x.max=7 y.min=0 y.max=7
    //% color.shadow="colorNumberPicker"
    export function setPixel(x: number, y: number, color: number): void {
        if (strip) {
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                index = (matrixHeight - 1 - y) * matrixWidth + x;//(y)* 8 + x;
                strip.setPixelColor(index, color);
            }
        }
    }

    //% block="scroll text $text with color $color and delay $delay ms"
    //% color.shadow="colorNumberPicker"
    export function scrollText(text: string, color: number, delay: number): void {
        textArray = getTextArray(text);
        totalWidth = textArray[0].length;
        //serial.writeLine("beginning Scrolling")
        for (let offset = 0; offset < totalWidth; offset++) {
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    if (x + offset >= totalWidth) continue;
                    const PixelOn = textArray[y][x + offset] == 1;
                    setPixel(x, y, PixelOn ? color : 0);
                }
            }
            strip.show();
            basic.pause(delay);
        }
        textArray = [];
        serial.writeLine("scrollText: Scroll Text Completed");
    }

    function getTextArray(text: string): number[][] {
        // Simple 8x8 font
        const font: { [char: string]: number[] } = {
            // Uppercase letters map
            'A': [0b00000000, 0b00011000, 0b00100100, 0b01000010, 0b01111110, 0b01000010, 0b01000010, 0b00000000],
            'B': [0b00000000, 0b01111000, 0b01000100, 0b01111000, 0b01000100, 0b01000100, 0b01111000, 0b00000000],
            'C': [0b00000000, 0b00111100, 0b01000010, 0b01000000, 0b01000000, 0b01000010, 0b00111100, 0b00000000],
            'D': [0b00000000, 0b01111000, 0b01000100, 0b01000010, 0b01000010, 0b01000100, 0b01111000, 0b00000000],
            'E': [0b00000000, 0b01111110, 0b01000000, 0b01111000, 0b01000000, 0b01000000, 0b01111110, 0b00000000],
            'F': [0b00000000, 0b01111110, 0b01000000, 0b01111000, 0b01000000, 0b01000000, 0b01000000, 0b00000000],
            'G': [0b00000000, 0b00111100, 0b01000010, 0b01000000, 0b01001110, 0b01000010, 0b00111100, 0b00000000],
            'H': [0b00000000, 0b01000010, 0b01000010, 0b01111110, 0b01000010, 0b01000010, 0b01000010, 0b00000000],
            'I': [0b00000000, 0b00111100, 0b00011000, 0b00011000, 0b00011000, 0b00011000, 0b00111100, 0b00000000],
            'J': [0b00000000, 0b00011110, 0b00000100, 0b00000100, 0b00000100, 0b01000100, 0b00111000, 0b00000000],
            'K': [0b00000000, 0b01000010, 0b01000100, 0b01001000, 0b01110000, 0b01001000, 0b01000100, 0b00000000],
            'L': [0b00000000, 0b01000000, 0b01000000, 0b01000000, 0b01000000, 0b01000000, 0b01111110, 0b00000000],
            'M': [0b00000000, 0b01000010, 0b01100110, 0b01011010, 0b01000010, 0b01000010, 0b01000010, 0b00000000],
            'N': [0b00000000, 0b01000010, 0b01100010, 0b01010010, 0b01001010, 0b01000110, 0b01000010, 0b00000000],
            'O': [0b00000000, 0b00111100, 0b01000010, 0b01000010, 0b01000010, 0b01000010, 0b00111100, 0b00000000],
            'P': [0b00000000, 0b01111000, 0b01000100, 0b01000100, 0b01111000, 0b01000000, 0b01000000, 0b00000000],
            'Q': [0b00000000, 0b00111100, 0b01000010, 0b01000010, 0b01001010, 0b01000100, 0b00111010, 0b00000000],
            'R': [0b00000000, 0b01111000, 0b01000100, 0b01000100, 0b01111000, 0b01001000, 0b01000100, 0b00000000],
            'S': [0b00000000, 0b00111100, 0b01000010, 0b00110000, 0b00001100, 0b01000010, 0b00111100, 0b00000000],
            'T': [0b00000000, 0b01111110, 0b00011000, 0b00011000, 0b00011000, 0b00011000, 0b00011000, 0b00000000],
            'U': [0b00000000, 0b01000010, 0b01000010, 0b01000010, 0b01000010, 0b01000010, 0b00111100, 0b00000000],
            'V': [0b00000000, 0b01000010, 0b01000010, 0b01000010, 0b00100100, 0b00100100, 0b00011000, 0b00000000],
            'W': [0b00000000, 0b01000010, 0b01000010, 0b01000010, 0b01011010, 0b01100110, 0b01000010, 0b00000000],
            'X': [0b00000000, 0b01000010, 0b00100100, 0b00011000, 0b00011000, 0b00100100, 0b01000010, 0b00000000],
            'Y': [0b00000000, 0b01000010, 0b00100100, 0b00011000, 0b00011000, 0b00011000, 0b00011000, 0b00000000],
            'Z': [0b00000000, 0b01111110, 0b00000100, 0b00001000, 0b00010000, 0b00100000, 0b01111110, 0b00000000],
            ' ': [0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000],
            // Lowercase letters map
            'a': [0b00000000, 0b00000000, 0b00111100, 0b00000010, 0b00111110, 0b01000010, 0b00111110, 0b00000000],
            'b': [0b00000000, 0b01000000, 0b01000000, 0b01111100, 0b01000010, 0b01000010, 0b01111100, 0b00000000],
            'c': [0b00000000, 0b00000000, 0b00111100, 0b01000000, 0b01000000, 0b01000010, 0b00111100, 0b00000000],
            'd': [0b00000000, 0b00000010, 0b00000010, 0b00111110, 0b01000010, 0b01000010, 0b00111110, 0b00000000],
            'e': [0b00000000, 0b00000000, 0b00111100, 0b01000010, 0b01111110, 0b01000000, 0b00111100, 0b00000000],
            'f': [0b00000000, 0b00001100, 0b00010010, 0b00010000, 0b01111100, 0b00010000, 0b00010000, 0b00000000],
            'g': [0b00000000, 0b00000000, 0b00111110, 0b01000010, 0b00111110, 0b00000010, 0b01111100, 0b00000000],
            'h': [0b00000000, 0b01000000, 0b01000000, 0b01111100, 0b01000010, 0b01000010, 0b01000010, 0b00000000],
            'i': [0b00000000, 0b00000000, 0b00011000, 0b00000000, 0b00111000, 0b00001000, 0b00111100, 0b00000000],
            'j': [0b00000000, 0b00000000, 0b00001100, 0b00000000, 0b00011100, 0b00000100, 0b00111100, 0b00000000],
            'k': [0b00000000, 0b01000000, 0b01000010, 0b01000100, 0b01111000, 0b01000100, 0b01000010, 0b00000000],
            'l': [0b00000000, 0b00110000, 0b00001000, 0b00001000, 0b00001000, 0b00001000, 0b00111100, 0b00000000],
            'm': [0b00000000, 0b00000000, 0b01100100, 0b01011010, 0b01000010, 0b01000010, 0b01000010, 0b00000000],
            'n': [0b00000000, 0b00000000, 0b01111000, 0b01000100, 0b01000100, 0b01000100, 0b01000100, 0b00000000],
            'o': [0b00000000, 0b00000000, 0b00111100, 0b01000010, 0b01000010, 0b01000010, 0b00111100, 0b00000000],
            'p': [0b00000000, 0b00000000, 0b01111100, 0b01000010, 0b01111100, 0b01000000, 0b01000000, 0b00000000],
            'q': [0b00000000, 0b00000000, 0b00111110, 0b01000010, 0b00111110, 0b00000010, 0b00000010, 0b00000000],
            'r': [0b00000000, 0b00000000, 0b01011100, 0b01100010, 0b01000000, 0b01000000, 0b01000000, 0b00000000],
            's': [0b00000000, 0b00000000, 0b00111110, 0b01000000, 0b00111100, 0b00000010, 0b01111100, 0b00000000],
            't': [0b00000000, 0b00000000, 0b00010000, 0b01111100, 0b00010000, 0b00010010, 0b00001100, 0b00000000],
            'u': [0b00000000, 0b00000000, 0b01000010, 0b01000010, 0b01000010, 0b01000110, 0b00111010, 0b00000000],
            'v': [0b00000000, 0b00000000, 0b01000010, 0b01000010, 0b00100100, 0b00100100, 0b00011000, 0b00000000],
            'w': [0b00000000, 0b00000000, 0b01000010, 0b01000010, 0b01011010, 0b01100110, 0b01000010, 0b00000000],
            'x': [0b00000000, 0b00000000, 0b01000010, 0b00100100, 0b00011000, 0b00100100, 0b01000010, 0b00000000],
            'y': [0b00000000, 0b00000000, 0b01000010, 0b01000010, 0b00111110, 0b00000010, 0b00111100, 0b00000000],
            'z': [0b00000000, 0b00000000, 0b01111110, 0b00000100, 0b00001000, 0b00100000, 0b01111110, 0b00000000],
        }
        result = [];
        binaryArray = [];
        finalResult = [];
        output = [];
        charData = [];
        charMatrix = [];
        counter += 1;
        serial.writeLine("getTextArray: Number of Executions: " + counter);
        //create binary array of each 
        for (let i = 0; i < text.length; i++) {
            if (font[text[i]]) {
                try {
                    charData = font[text[i]];
                } catch {
                    serial.writeLine("getTextArray: Error getting char Data");
                }

                for (let row of charData) {
                    for (let bit = 7; bit >= 0; bit--) {
                        try {
                            binaryArray.push((row >> bit) & 1);
                        } catch {
                            serial.writeLine("getTextArray: Error transforming Array");
                        }
                    }
                    try {
                        charMatrix.push(binaryArray);
                        binaryArray = [];
                    } catch {
                        serial.writeLine("getTextArray: Error pushing binary Array");
                    }
                }
                serial.writeLine("getTextArray: pushed binary")
                try {
                    output = charMatrix[0].map((_, colIndex) => charMatrix.map(row => row[colIndex]));
                    charMatrix = [];
                } catch (err) {
                    serial.writeLine("getTextArray: Error transposing character matrix");
                }
                try {
                    result = result.concat(output);
                } catch {
                    serial.writeLine("getTextArray: failed to push char array");
                }
                serial.writeLine("getTextArray: pushed zeros");
            }
        }
        serial.writeLine("getTextArray: Centering Result");
        try {
            finalResult = result[0].map((_, columnIndex) => result.map(rows => rows[columnIndex]));
        } catch (err) {
            serial.writeLine("getTextArray: Error transposing final matrix")
        }

        serial.writeLine("getTextArray: final Matrix: ");
        return finalResult;
    }
    //% block="show image on NeoPixel matrix $image with color $color"
    //% color.shadow="colorNumberPicker"
    export function showImage(image: Image, color: number): void {
        try {
            let imagewidth = image.width();
            let imageheight = image.height();

            for (let x = 0; x < imagewidth; x++) {
                //serial.writeLine("generating matrix 1");
                for (let y = 0; y < imageheight; y++) {
                    //serial.writeLine("generating matrix 0");
                    if (image.pixel(x, y)) {
                        setPixel(x, y, color);
                    }
                }
            }
        } catch {
            serial.writeLine("showImage: Error creating image matrix");
        }
        strip.show();
        im = <Image><any>'';
    }
    /**
     */
    //% block="Bild8x8"
    //% imageLiteral=1
    //% imageLiteralColumns=8
    //% imageLiteralRows=8
    //% shim=images::createImage
    //% weight=90
    export function matrix8x8(i: string): Image {
        im = <Image><any>i;
        return im
    }

}



