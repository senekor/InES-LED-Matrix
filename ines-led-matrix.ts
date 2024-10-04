namespace NeoPixelMatrix {
    // ENUMS
    enum Direction {
        //% block="right"
        Right = 0,
        //% block="left"
        Left = 1
    }

    //% block="JoystickDirection" // in case strings are needed instead of numbers
    // type JoystickDirection = 
    //     | "notPressed"
    //     | "center"
    //     | "up"
    //     | "down"
    //     | "right"
    //     | "left";
    enum JoystickDirection {
        //% block="notPressed"
        NotPressed = 0,
        //% block="center"
        Center = 1,
        //% block="up"
        Up = 2,
        //% block="down"
        Down = 3,
        //% block="right"
        Right = 4,
        //% block="left"
        Left = 5
    }

    // GLOBAL VARIABLES
    const startTime = control.millis();
    let currentTimeSeconds: number = 0;
    const timeUpdateInterval: number = 1; // in second
    let timeUpdateIntervalCounter = 0;
    let isUpdatingTime: boolean = false;
    let missedTimeUpdates: number = 0;
    let strip: neopixel.Strip;
    let matrixWidth = 8; // x
    let matrixHeight = 8; // y
    let defaultBrightness = 100; // 0 to 255
    let pollingInterval = 100 // 100ms Interval for polling LED Matrix Interface. Adjust the polling interval as needed.
    let pinSlider: DigitalPin = DigitalPin.P1;
    let pinCenterButton: DigitalPin = DigitalPin.P2;
    let pinUpButton: DigitalPin = DigitalPin.P9;
    let pinDownButton: DigitalPin = DigitalPin.P16;
    let pinRightButton: DigitalPin = DigitalPin.P8;
    let pinLeftButton: DigitalPin = DigitalPin.P12;
    let counter = 0;
    let lastSliderValue = readSlider();
    let lastJoystickDirection: JoystickDirection = JoystickDirection.NotPressed;
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
    let debugEnabled: boolean = false;

    // Simple 8x8 font
    let textFont: { [char: string]: number[] } = {
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
    };

    //% block="set serial debugging prints to $enable"
    //% enable.shadow="toggleOnOff"
    export function debugEnable(enable: boolean): void {
        debugEnabled = enable;
    }

    function serialDebugMsg(message: string): void {
        if (debugEnabled) {
            serial.writeLine(message);
        }
    }

    //% block="initialize NeoPixel matrix with pin $pin and brightness $brightness"
    //% brightness.min=0 brightness.max=255
    export function initializeMatrix(pin: DigitalPin = DigitalPin.P0, brightness: number): void {
        serial.setBaudRate(BaudRate.BaudRate115200)
        serial.redirectToUSB();

        defaultBrightness = brightness;
        strip = neopixel.create(pin, matrixWidth * matrixHeight, NeoPixelMode.RGB);
        strip.setBrightness(brightness);
        clear();
        initializeMatrixInterface();
        control.inBackground(function () {
            while (true) {
                calculateCurrentTime();
            }
        });
        serialDebugMsg("initializeMatrix: Matrix init on pin: " + pin + " with brightness: " + brightness);
    }

    function initializeMatrixInterface(): void {
        pins.setPull(pinSlider, PinPullMode.PullUp);
        pins.setPull(pinCenterButton, PinPullMode.PullUp);
        pins.setPull(pinUpButton, PinPullMode.PullUp);
        pins.setPull(pinDownButton, PinPullMode.PullUp);
        pins.setPull(pinRightButton, PinPullMode.PullUp);
        pins.setPull(pinLeftButton, PinPullMode.PullUp);
        serialDebugMsg("initializeMatrixInterface: pinSlider: " + pinSlider + ", pinCenterButton:" + pinCenterButton + ", pinUpButton: " + pinUpButton + ", pinDownButton: " + pinDownButton + ", pinRightButton:" + pinRightButton + ", pinLeftButton: " + pinLeftButton);
    }

    //% block="initialize LED Matrix Interface (Expert). \nSlider pin $pinSliderTemp \nCenter button pin $pinCenterButtonTemp \nUp button pin $pinUpButtonTemp \nDown button pin $pinDownButtonTemp \nRight button pin $pinRightButtonTemp \nLeft button pin $pinLeftButtonTemp"
    export function initializeMatrixInterfaceExpert(
        pinSliderTemp: DigitalPin,
        pinCenterButtonTemp: DigitalPin,
        pinUpButtonTemp: DigitalPin,
        pinDownButtonTemp: DigitalPin,
        pinRightButtonTemp: DigitalPin,
        pinLeftButtonTemp: DigitalPin
    ): void {
        pinSlider = pinSliderTemp;
        pinCenterButton = pinCenterButtonTemp;
        pinUpButton = pinUpButtonTemp;
        pinDownButton = pinDownButtonTemp;
        pinRightButton = pinRightButtonTemp;
        pinLeftButton = pinLeftButtonTemp;

        pins.setPull(pinSlider, PinPullMode.PullUp);
        pins.setPull(pinCenterButton, PinPullMode.PullUp);
        pins.setPull(pinUpButton, PinPullMode.PullUp);
        pins.setPull(pinDownButton, PinPullMode.PullUp);
        pins.setPull(pinRightButton, PinPullMode.PullUp);
        pins.setPull(pinLeftButton, PinPullMode.PullUp);
        serialDebugMsg("initializeMatrixInterface: pinSlider: " + pinSlider + ", pinCenterButton:" + pinCenterButton + ", pinUpButton: " + pinUpButton + ", pinDownButton: " + pinDownButton + ", pinRightButton:" + pinRightButton + ", pinLeftButton: " + pinLeftButton);
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
        defaultBrightness = brightness;
        strip.setBrightness(brightness);
        strip.show();
        serialDebugMsg(`setBrightness: Brightness is set to = ${brightness}`);
    }

    function setPixel(x: number, y: number, color: number): void {
        if (strip) {
            if (x >= 0 && x < matrixWidth && y >= 0 && y < matrixHeight) {
                index = (matrixHeight - 1 - y) * matrixWidth + x;//(y)* 8 + x;
                strip.setPixelColor(index, color);
                // serialDebugMsg("setPixel: set pixel(" + x + "," + y + ") to = #" + color);
            } else {
                serialDebugMsg("setPixel: Error pixel out of range");
            }
        }
    }

    //% block="set one pixel at x $x y $y to color $color"
    //% x.min=0 x.max=7 y.min=0 y.max=7
    //% color.shadow="colorNumberPicker"
    export function setOnePixel(x: number, y: number, color: number): void {
        setPixel(x, y, color);
        strip.show();
        serialDebugMsg("setOnePixel: Pixel: " + x + "," + y + " is set to color: " + color);
    }

    //% block="set one pixel at x:$x y:$y to RGB colors R:$R G:$G B:$B"
    //% x.min=0 x.max=7 y.min=0 y.max=7
    //% R.min=0 R.max=255 G.min=0 G.max=255 B.min=0 B.max=255
    export function setOnePixelRGB(x: number, y: number, R: number, G: number, B: number): void {
        let color = neopixel.rgb(R, G, B);
        setPixel(x, y, color);
        strip.show();
        serialDebugMsg("setOnePixel: Pixel: " + x + "," + y + " is set to color(R,G,B): (" + R + "," + G + "," + B + ")");
    }

    //% block="read GPIO $pin"
    export function readGPIO(pin: DigitalPin): number { // Function not really needed, just for debugging
        let value = pins.analogReadPin(pin);
        serialDebugMsg("readGPIO: GPIO: " + pin + " Value: " + value);
        return value;
    }

    //% block="read slider value"
    export function readSlider(): number {
        return pins.digitalReadPin(pinSlider);
    }

    //% block="when slider value changed"
    export function SliderValueChanged(callback: () => void): void {
        control.inBackground(() => {
            while (true) {
                let currentSliderValue = pins.digitalReadPin(pinSlider);
                if (currentSliderValue !== lastSliderValue) {
                    lastSliderValue = currentSliderValue;
                    callback();
                }
                basic.pause(pollingInterval);
            }
        });
    }

    //% block="read joystick direction"
    export function readJoystick(): number {
        if (pins.digitalReadPin(pinCenterButton) == 0) {
            return JoystickDirection.Center;
        } else if (pins.digitalReadPin(pinUpButton) == 0) {
            return JoystickDirection.Up;
        } else if (pins.digitalReadPin(pinDownButton) == 0) {
            return JoystickDirection.Down;
        } else if (pins.digitalReadPin(pinRightButton) == 0) {
            return JoystickDirection.Right;
        } else if (pins.digitalReadPin(pinLeftButton) == 0) {
            return JoystickDirection.Left;
        } else {
            return JoystickDirection.NotPressed;
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
        im = <Image><any>i;
        return im
    }

    //% block="show image on NeoPixel matrix $image with color $color"
    //% color.shadow="colorNumberPicker"
    export function showImage(image: Image, color: number): void {
        try {
            let imagewidth = image.width();
            let imageheight = image.height();

            for (let x = 0; x < imagewidth; x++) {
                //serialDebugMsg("generating matrix 1");
                for (let y = 0; y < imageheight; y++) {
                    //serialDebugMsg("generating matrix 0");
                    if (image.pixel(x, y)) {
                        setPixel(x, y, color);
                    }
                }
            }
        } catch {
            serialDebugMsg("showImage: Error creating image matrix");
        }
        strip.show();
        im = <Image><any>'';
    }

    //% block="show moving image on NeoPixel matrix $image with color $color and speed $speed in direction $direction"
    //% color.shadow="colorNumberPicker"
    //% speed.defl=100 speed.min=1 speed.max=1000
    //% direction.defl=Direction.Right
    export function movingImage(image: Image, color: number, speed: number, direction: Direction): void {
        // Due to a bug the block is always generated with speed of 0. In this case we set it to 100ms.
        if (speed < 1) {
            speed = 100; // 100ms
        }

        try {
            if (direction === Direction.Left) {
                for (let offset = -matrixWidth; offset <= matrixWidth; offset++) {
                    for (let x = 0; x < matrixWidth; x++) {
                        for (let y = 0; y < matrixHeight; y++) {
                            const PixelOn = image.pixel(x + offset, y);
                            //serialDebugMsg(`Pixel at (${x + offset}, ${y}) is ${PixelOn ? "on" : "off"}`);
                            setPixel(x, y, PixelOn ? color : 0);
                        }
                    }
                    strip.show();
                    basic.pause(speed);
                }
            } else if (direction === Direction.Right) {
                for (let offset = matrixWidth; offset >= -matrixWidth; offset--) {
                    for (let x = 0; x < matrixWidth; x++) {
                        for (let y = 0; y < matrixHeight; y++) {
                            ;
                            const PixelOn = image.pixel(x + offset, y);
                            //serialDebugMsg(`Pixel at (${x + offset}, ${y}) is ${PixelOn ? "on" : "off"}`);
                            setPixel(x, y, PixelOn ? color : 0);
                        }
                    }
                    strip.show();
                    basic.pause(speed);
                }
            }
        } catch {
            serialDebugMsg("movingImage: Error displaying moving image");
        }
    }

    //% block="scroll text $text with color $color and delay $delay ms"
    //% color.shadow="colorNumberPicker"
    export function scrollText(text: string, color: number, delay: number): void {
        textArray = getTextArray(text);
        totalWidth = textArray[0].length;
        serialDebugMsg("\nscrollText: beginning Scrolling text: " + text);
        for (let offset = 0; offset < totalWidth; offset++) { // Scrolls text to the left
            for (let x = 0; x < matrixWidth; x++) {
                for (let y = 0; y < matrixHeight; y++) {
                    if (x + offset >= totalWidth) continue;
                    const PixelOn = textArray[y][x + offset] == 1;
                    setPixel(x, y, PixelOn ? color : 0);
                }
            }
            strip.show();
            basic.pause(delay);
        }
        textArray = [];
        serialDebugMsg("scrollText: Scroll Text Completed\n");
    }

    function getTextArray(text: string): number[][] {
        result = [];
        binaryArray = [];
        finalResult = [];
        output = [];
        charData = [];
        charMatrix = [];
        counter += 1;
        //serialDebugMsg("getTextArray: Number of Executions: " + counter);

        //create binary array of each 
        for (let i = 0; i < text.length; i++) {
            if (textFont[text[i]]) {
                try {
                    charData = textFont[text[i]];
                } catch {
                    serialDebugMsg("getTextArray: Error getting char Data");
                }

                for (let row of charData) {
                    for (let bit = matrixWidth - 1; bit >= 0; bit--) {
                        try {
                            binaryArray.push((row >> bit) & 1);
                        } catch {
                            serialDebugMsg("getTextArray: Error transforming Array");
                        }
                    }
                    try {
                        charMatrix.push(binaryArray);
                        binaryArray = [];
                    } catch {
                        serialDebugMsg("getTextArray: Error pushing binary Array");
                    }
                }
                //serialDebugMsg("getTextArray: pushed binary")
                try {
                    output = charMatrix[0].map((_, colIndex) => charMatrix.map(row => row[colIndex]));
                    charMatrix = [];
                } catch (err) {
                    serialDebugMsg("getTextArray: Error transposing character matrix");
                }
                try {
                    result = result.concat(output);
                } catch {
                    serialDebugMsg("getTextArray: failed to push char array");
                }
                //serialDebugMsg("getTextArray: pushed zeros");
            }
        }
        //serialDebugMsg("getTextArray: Centering Result");
        try {
            finalResult = result[0].map((_, columnIndex) => result.map(rows => rows[columnIndex]));
        } catch (err) {
            serialDebugMsg("getTextArray: Error transposing final matrix")
        }

        // Clear arrays to free memory (garbage collector can reclaim memory)
        result = null;
        binaryArray = null;
        output = null;
        charData = null;
        charMatrix = null;

        //serialDebugMsg("getTextArray: Successfully created text array");
        return finalResult;
    }

    function sleepUntil(targetTime: number): void {
        const currentTime = control.millis();
        const delay = targetTime - currentTime;

        if (delay <= 0) {
            // If the target time is in the past or now, call the callback immediately
        } else {
            basic.pause(delay);
        }
    }

    // Function to calculate the current time, needs to be run in the background
    function calculateCurrentTime(): void {
        // Calculate the next wake-up time
        let nextWakeUpTime = startTime + timeUpdateInterval * 1000 * timeUpdateIntervalCounter;

        // Sleep until the next wake-up time
        sleepUntil(nextWakeUpTime);
        if (!isUpdatingTime) { // Mutex to prevent updating time while it is being calculated
            isUpdatingTime = true;
            currentTimeSeconds = currentTimeSeconds + timeUpdateInterval + missedTimeUpdates;
            if (currentTimeSeconds >= 86400) {
                currentTimeSeconds = 0;
            }
            isUpdatingTime = false;
            missedTimeUpdates = 0;
        } else {
            missedTimeUpdates++;
            serialDebugMsg("calculateCurrentTime: Time is being updated, trying again later. Missed updates: " + missedTimeUpdates);
            return;
        }
        timeUpdateIntervalCounter++;
        serialDebugMsg("calculateCurrentTime: currentTimeSeconds = " + currentTimeSeconds);

        // Schedule the next calculation
        // calculateCurrentTime(); // DO not use nested calls to calculateCurrentTime within the callback of sleepUntil can lead to fucked up shit.
    }

    //% block="get current time as text"
    export function getCurrentTimeAsText(): string {
        let hours = Math.floor(currentTimeSeconds / 3600) % 24;
        let minutes = Math.floor((currentTimeSeconds % 3600) / 60);
        let seconds = currentTimeSeconds % 60;

        // // return the time as a 2D array of numbers
        // return [
        //     [hours],
        //     [minutes],
        //     [seconds]
        // ];
        return `${hours}:${minutes}:${seconds}`; // return the time as a string
    }

    // TODO Bug in block no slider for setting time, only works with variables
    //% block="set current time to $hours:$minutes:$seconds"
    //% hours.min=0 hours.max=23
    //% minutes.min = 0 minutes.max = 59
    //% seconds.min = 0 seconds.max = 59
    export function setCurrentTime(hours: number, minutes: number, seconds: number): void {
        // Validate the input time
        if (hours < 0 || hours > 23) {
            serialDebugMsg("Invalid hours. Must be between 0 and 23.");
        } else if (minutes < 0 || minutes > 59) {
            serialDebugMsg("Invalid minutes. Must be between 0 and 59.");
        } else if (seconds < 0 || seconds > 59) {
            serialDebugMsg("Invalid seconds. Must be between 0 and 59.");
        } else {
            if (!isUpdatingTime) { // Mutex to prevent updating time while it is being calculated
                // Calculate the start time in seconds
                isUpdatingTime = true;
                currentTimeSeconds = hours * 3600 + minutes * 60 + seconds;
                isUpdatingTime = false;
                serialDebugMsg(`setCurrentTime: Time set to ${hours}:${minutes}:${seconds}`);

            } else {
                serialDebugMsg("setCurrentTime: Time is being updated, please try again later.");
                return;
            }
        }
    }
}
