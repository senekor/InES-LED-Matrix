// Gib deinen Code hier ein
namespace NeoPixelMatrix {
    let strip: neopixel.Strip;
    let matrixWidth = 8;
    let matrixHeight = 8;
    let defaultBrightness = 128;

    //% block="initialize NeoPixel matrix with pin $pin and brightness $brightness"
    //% brightness.min=0 brightness.max=255
    export function initializeMatrix(pin: DigitalPin, brightness: number): void {
        strip = neopixel.create(pin, matrixWidth * matrixHeight, NeoPixelMode.RGB);
        defaultBrightness = brightness;
        strip.setBrightness(brightness);
        clear();
    }

    //% block="clear NeoPixel matrix"
    export function clear(): void {
        strip.clear();
        strip.show();
    }

    //% block="set pixel at x $x y $y to color $color"
    //% x.min=0 x.max=7 y.min=0 y.max=7
    //% color.shadow="colorNumberPicker"
    export function setPixel(x: number, y: number, color: number): void {
        if (x >= 0 && x < matrixWidth && y >= 0 && y < matrixHeight) {
            let index = (matrixHeight - 1 - y) * matrixWidth + x;
            strip.setPixelColor(index, color);
            strip.show();
        }
    }

    //% block="scroll text $text with color $color and delay $delay ms"
    //% color.shadow="colorNumberPicker"
    export function scrollText(text: string, color: number, delay: number): void {
        let textArray = getTextArray(text);
        let totalWidth = textArray[0].length;

        for (let offset = 0; offset < totalWidth; offset++) {
            clear();
            for (let x = 0; x < matrixWidth; x++) {
                for (let y = 0; y < matrixHeight; y++) {
                    if (textArray[y][x + offset] == 1) {
                        setPixel(x, y, color);
                    }
                }
            }
            basic.pause(delay);
        }
    }

    function getTextArray(text: string): number[][] {
        // Simple 6x6 font, expanded to include the entire alphabet.
        const font: { [char: string]: number[] } = {
            'A': [0b001100, 0b010010, 0b100001, 0b111111, 0b100001, 0b100001],
            'B': [0b111110, 0b100001, 0b111110, 0b100001, 0b100001, 0b111110],
            'C': [0b011110, 0b100001, 0b100000, 0b100000, 0b100001, 0b011110],
            'D': [0b111100, 0b100010, 0b100001, 0b100001, 0b100010, 0b111100],
            'E': [0b111111, 0b100000, 0b111110, 0b100000, 0b100000, 0b111111],
            'F': [0b111111, 0b100000, 0b111110, 0b100000, 0b100000, 0b100000],
            'G': [0b011110, 0b100001, 0b100000, 0b101111, 0b100001, 0b011110],
            'H': [0b100001, 0b100001, 0b111111, 0b100001, 0b100001, 0b100001],
            'I': [0b111110, 0b001100, 0b001100, 0b001100, 0b001100, 0b111110],
            'J': [0b000111, 0b000010, 0b000010, 0b100010, 0b100010, 0b011100],
            'K': [0b100001, 0b100010, 0b111100, 0b100010, 0b100001, 0b100001],
            'L': [0b100000, 0b100000, 0b100000, 0b100000, 0b100000, 0b111110],
            'M': [0b100001, 0b110011, 0b101101, 0b100001, 0b100001, 0b100001],
            'N': [0b100001, 0b110001, 0b101001, 0b100101, 0b100011, 0b100001],
            'O': [0b011110, 0b100001, 0b100001, 0b100001, 0b100001, 0b011110],
            'P': [0b111110, 0b100001, 0b111110, 0b100000, 0b100000, 0b100000],
            'Q': [0b011110, 0b100001, 0b100001, 0b100101, 0b100011, 0b011101],
            'R': [0b111110, 0b100001, 0b111110, 0b100010, 0b100001, 0b100001],
            'S': [0b011111, 0b100000, 0b011110, 0b000001, 0b000001, 0b111110],
            'T': [0b111111, 0b001100, 0b001100, 0b001100, 0b001100, 0b001100],
            'U': [0b100001, 0b100001, 0b100001, 0b100001, 0b100001, 0b011110],
            'V': [0b100001, 0b100001, 0b100001, 0b010010, 0b010010, 0b001100],
            'W': [0b100001, 0b100001, 0b100001, 0b101101, 0b110011, 0b100001],
            'X': [0b100001, 0b010010, 0b001100, 0b001100, 0b010010, 0b100001],
            'Y': [0b100001, 0b010010, 0b001100, 0b001100, 0b001100, 0b001100],
            'Z': [0b111111, 0b000011, 0b000110, 0b001100, 0b011000, 0b111111],
            'a': [0b000000, 0b011100, 0b100010, 0b100010, 0b100010, 0b011110],
            'b': [0b100000, 0b100000, 0b111110, 0b100001, 0b100001, 0b111110],
            'c': [0b000000, 0b011110, 0b100000, 0b100000, 0b100000, 0b011110],
            'd': [0b000001, 0b000001, 0b011111, 0b100001, 0b100001, 0b011111],
            'e': [0b000000, 0b011110, 0b100001, 0b111111, 0b100000, 0b011110],
            'f': [0b001100, 0b010010, 0b010000, 0b111100, 0b010000, 0b111100],
            'g': [0b000000, 0b011110, 0b100001, 0b011111, 0b000001, 0b111110],
            'h': [0b100000, 0b100000, 0b111110, 0b100001, 0b100001, 0b100001],
            'i': [0b001100, 0b000000, 0b001100, 0b001100, 0b001100, 0b001100],
            'j': [0b000110, 0b000000, 0b000110, 0b000110, 0b100110, 0b011100],
            'k': [0b100000, 0b100010, 0b101100, 0b110001, 0b101010, 0b100010],
            'l': [0b001100, 0b001100, 0b001100, 0b001100, 0b001100, 0b001100],
            'm': [0b000000, 0b110101, 0b101010, 0b101010, 0b101010, 0b101010],
            'n': [0b000000, 0b111100, 0b100010, 0b100010, 0b100010, 0b100010],
            'o': [0b000000, 0b011110, 0b100001, 0b100001, 0b100001, 0b011110],
            'p': [0b000000, 0b111100, 0b100010, 0b111100, 0b100000, 0b100000],
            'q': [0b000000, 0b011111, 0b100001, 0b011111, 0b000001, 0b000001],
            'r': [0b000000, 0b101110, 0b110001, 0b100000, 0b100000, 0b100000],
            's': [0b000000, 0b011110, 0b100000, 0b011100, 0b000010, 0b111100],
            't': [0b010000, 0b111100, 0b010000, 0b010000, 0b010010, 0b001100],
            'u': [0b000000, 0b100001, 0b100001, 0b100001, 0b100101, 0b011110],
            'v': [0b000000, 0b100001, 0b100001, 0b010010, 0b001100, 0b000000],
            'w': [0b000000, 0b101010, 0b101010, 0b101010, 0b101010, 0b010100],
            'x': [0b000000, 0b100001, 0b010010, 0b001100, 0b010010, 0b100001],
            'y': [0b000000, 0b100001, 0b100001, 0b011110, 0b000001, 0b111110],
            'z': [0b000000, 0b111110, 0b000100, 0b001000, 0b010000, 0b111110]
        };

        let result: number[][] = [];

        for (let char of text) {
            if (font[char]) {
                let charData = font[char];
                let charMatrix = [];

                for (let row of charData) {
                    let binaryArray = [];
                    for (let bit = 5; bit >= 0; bit--) {
                        binaryArray.push((row >> bit) & 1);
                    }
                    charMatrix.push(binaryArray);
                }

                // Transpose the character matrix
                for (let x = 0; x < 6; x++) {
                    let column = [];
                    for (let y = 0; y < 6; y++) {
                        column.push(charMatrix[y][x]);
                    }
                    result.push(column);
                }

                // Add a column of zeros as spacing between characters
                result.push([0, 0, 0, 0, 0, 0]);
            }
        }

        // Ensure the array is 8 rows tall and centered vertically
        let centeredResult: number[][] = [];
        for (let x = 0; x < result.length; x++) {
            let column = [];
            for (let y = 0; y < 8; y++) {
                if (y < 1 || y > 6) {
                    column.push(0);
                } else {
                    column.push(result[x][y - 1] || 0);
                }
            }
            centeredResult.push(column);
        }

        // Transpose the centeredResult to match matrix display orientation
        let finalResult: number[][] = [];
        for (let y = 0; y < 8; y++) {
            let row = [];
            for (let x = 0; x < centeredResult.length; x++) {
                row.push(centeredResult[x][y]);
            }
            finalResult.push(row);
        }

        return finalResult;
    }
    //% block="show image on NeoPixel matrix $image with color $color"
    //% color.shadow="colorNumberPicker"
    export function showImage(image: Image, color: number): void {
        for (let x = 0; x < matrixWidth; x++) {
            for (let y = 0; y < matrixHeight; y++) {
                if (image.pixel(x, y)) {
                    setPixel(x, y, color);
                }
            }
        }
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
        const im = <Image><any>i;
        return im
    }

}

