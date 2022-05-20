$(() => {
    const KEYCODES = {
        LEFT: { CODE: 37, CHAR: '⬅' },
        UP: { CODE: 38, CHAR: '⬆' },
        RIGHT: { CODE: 39, CHAR: '⮕' },
        DOWN: { CODE: 40, CHAR: '⬇' },
        ENTER: { CODE: 13, CHAR: 'ENTER' },
        A: { CODE: 65, CHAR: 'A' },
        B: { CODE: 66, CHAR: 'B' },
    };

    const initVHS = () => {
        const vhsItems = $('.vhs');
        vhsItems.each(function (item) {
            const container = $('<div class="vhs-main-container"></div>');
            $(this).after(container);


            let blueVersion = $(this).clone().addClass('vhs-blue');
            let greenVersion = $(this).clone().addClass('vhs-green');
            let redVersion = $(this).addClass('vhs-red');

            container.append(redVersion, blueVersion, greenVersion);

            let textContainer = $(this).text() !== '' ? 'vhs-text-container' : '';
            redVersion.wrap(`<div class="${textContainer} vhs-container vhs-red-container"></div>`);
            greenVersion.wrap(`<div class="${textContainer} vhs-container vhs-green-container"></div>`);
            blueVersion.wrap(`<div class="${textContainer} vhs-container vhs-blue-container"></div>`);

        });
    };
    initVHS();

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
    const step = $('#step');

    const handleKeyPress = (e) => {
        switch (e.keyCode) {
            case KEYCODES.ENTER.CODE:
                if (konamiCode.every((val, idx) => val.CODE === keysPressed[idx])) $('#msg').html('NOICE').addClass('zoom-in');
                else $('#msg').html('ABSOLUTELY NOT').addClass('zoom-in');
                break;
            default:
                keysPressed.push(e.keyCode);
                $('#step').html(e.key);
                break;
        }

    };

    $(document).keyup(handleKeyPress);

});