$(() => {


    /**
     * Take the element, clone it three times, and wrap each clone in a div with a different class
     * @param element - The jQuery element you want to CRTify
     * @returns A jQuery object containing a div with three channel split divs inside of it.
     */
    const CRTIFY = (element) => {
        const isTextElementWithoutBg = (el) => {
            const els = [...el.get(), ...el.find('*').get()];
            return els.every(el => {
                let hasBg = $(el).css('background-color') !== 'rgba(0, 0, 0, 0)' && $(el).css('background-color') !== '';
                let hasText = $(el).text().trim() !== '';
                return hasText && !hasBg;
            });
        };

        // Create a container for the element
        const container = $('<div class="vhs-main-container"></div>');

        // Clone the element three times to split red, green and blue channels
        let redVersion = element.clone().addClass('vhs-red');
        let greenVersion = element.clone().addClass('vhs-green');
        let blueVersion = element.clone().addClass('vhs-blue');


        // Checking if the element or it's children have a background color
        const isText = isTextElementWithoutBg(element);

        // Put our three versions into the container
        container.append(redVersion, blueVersion, greenVersion);

        // If the element has text inside it, and it doesn't have a background, give it another class
        const textContainer = (isText ? 'vhs-text-container' : '');
        redVersion.wrap(`<div class="${textContainer} vhs-container vhs-red-container"></div>`);
        greenVersion.wrap(`<div class="${textContainer} vhs-container vhs-green-container"></div>`);
        blueVersion.wrap(`<div class="${textContainer} vhs-container vhs-blue-container"></div>`);

        //
        return container;
    };

    // Loops through all items with a vhs class and replaces them with their CRTified version
    const initVHS = () => {
        const vhsItems = $('.vhs');
        vhsItems.each(function (item) {
            $(this).replaceWith(CRTIFY($(this)));
        });
    };
    initVHS();

    // Key code objects, with their unicode character
    const KEYCODES = {
        LEFT: { CODE: 37, CHAR: '⬅' },
        UP: { CODE: 38, CHAR: '⬆' },
        RIGHT: { CODE: 39, CHAR: '⮕' },
        DOWN: { CODE: 40, CHAR: '⬇' },
        ENTER: { CODE: 13, CHAR: 'ENTER' },
        A: { CODE: 65, CHAR: 'A' },
        B: { CODE: 66, CHAR: 'B' },
    };

    // Konami Code Sequence
    const konamiCode = [
        KEYCODES.UP,
        KEYCODES.UP,
        KEYCODES.DOWN,
        KEYCODES.DOWN,
        KEYCODES.LEFT,
        KEYCODES.RIGHT,
        KEYCODES.LEFT,
        KEYCODES.RIGHT,
        KEYCODES.B,
        KEYCODES.A,
        KEYCODES.ENTER];

    // Keys the user has pressed
    const keysPressed = [];
    // The element displaying the current step for the user
    const stepEl = $('#step');
    // The element displayed when the sequence is inputted correctly

    //language=HTML
    const winner = `
        <div>
            <img src="https://media.giphy.com/media/w8jI6Vv31Hf8Y/giphy.gif" alt="">
            <audio autoplay>
                <source src="/assets/audio/youwin.mp3" type="audio/mpeg">
            </audio>
        </div>`;

    // Set the step to the first one
    stepEl.text(konamiCode[0].CHAR);

    // Then CRTify the element
    stepEl.html(CRTIFY(stepEl));

    /**
     * Takes the key pressed and checks if it's the next key in the konami code. If it is, it displays the next
     * step. If it isn't, it displays an error message and resets the user.
     * @param e - The event object
     */
    const handleKeyPress = (e) => {
        keysPressed.push(e.keyCode);
        /* Checking if the key pressed is the next key in the konami code. If it is, it displays the next step. If it
        isn't, it displays an error message and resets the user. */
        if (konamiCode[keysPressed.length - 1].CODE === e.keyCode) {
            const nextStep = konamiCode[keysPressed.length];
            // If next step is undefined, display end message
            if (nextStep === undefined) {
                const window = $('<div class="window"></div>');
                window.append($(winner));
                stepEl.html(CRTIFY(window));
                keysPressed.splice(0, keysPressed.length);
            } else stepEl.html(CRTIFY(stepEl.text(nextStep.CHAR))); // Otherwise, display the CRTified next step
        } else {
            // Displaying error if the wrong keycode is pressed
            stepEl.html(CRTIFY(stepEl.text('⚠')));
            keysPressed.splice(0, keysPressed.length);
        }

    };

    $(document).keyup(handleKeyPress);

});