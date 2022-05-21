$(() => {
    const CRTIFY = (element) => {
        const container = $('<div class="vhs-main-container"></div>');


        let blueVersion = element.clone().addClass('vhs-blue');
        let greenVersion = element.clone().addClass('vhs-green');
        let redVersion = element.clone().addClass('vhs-red');


        const hasBg =
            element.css('background-color') === 'rgba(0,0,0,0)'
                ? true
                : element.children().length !== 0
                    ? element.children().toArray().every(child => $(child).css('background-color') === 'rgba(0,0,0,0)')
                    : false;
        container.append(redVersion, blueVersion, greenVersion);
        let textContainer = element.text() !== '' ? !hasBg ? 'vhs-text-container' : '' : '';
        redVersion.wrap(`<div class="${textContainer} vhs-container vhs-red-container"></div>`);
        greenVersion.wrap(`<div class="${textContainer} vhs-container vhs-green-container"></div>`);
        blueVersion.wrap(`<div class="${textContainer} vhs-container vhs-blue-container"></div>`);

        return container;
    };

    const initVHS = () => {
        const vhsItems = $('.vhs');
        vhsItems.each(function (item) {
            $(this).replaceWith(CRTIFY($(this)));
        });
    };
    initVHS();


    const KEYCODES = {
        LEFT: { CODE: 37, CHAR: '⬅' },
        UP: { CODE: 38, CHAR: '⬆' },
        RIGHT: { CODE: 39, CHAR: '⮕' },
        DOWN: { CODE: 40, CHAR: '⬇' },
        ENTER: { CODE: 13, CHAR: 'ENTER' },
        A: { CODE: 65, CHAR: 'A' },
        B: { CODE: 66, CHAR: 'B' },
    };
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
        KEYCODES.A];
    const keysPressed = [];
    const stepEl = $('#step');
    const gif = `<div class="window"><img src="https://media.giphy.com/media/w8jI6Vv31Hf8Y/giphy.gif" alt=""></div>`;

    stepEl.text(konamiCode[0].CHAR);
    stepEl.html(CRTIFY(stepEl));
    const handleKeyPress = (e) => {
        keysPressed.push(e.keyCode);
        if (konamiCode[keysPressed.length - 1].CODE === e.keyCode) {
            const code = konamiCode[keysPressed.length];
            stepEl.html(CRTIFY(stepEl.html(code ? code.CHAR : gif)));
        } else {
            stepEl.html(CRTIFY(stepEl.text('⚠')));
            keysPressed.splice(0, keysPressed.length);
        }

    };

    $(document).keyup(handleKeyPress);

});