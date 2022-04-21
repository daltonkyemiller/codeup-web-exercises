// Generates random integer between min and max
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generates random hex color
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

// Generate random HSL with high saturation and brightness (random pastel color)
const randomHSL = (b = 90, s = 75) => `hsla(${~~(360 * Math.random())},${s}%,${b}%,1)`;

// Promised based sleep()
const delay = (ms) => new Promise(r => setTimeout(r, ms));


// Turns html template string into usable element
const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

// Generates string with random color for each color
const prettyString = (str, colorDelay = 250) => {
    let charArr = str.split('');
    //language=HTML
    return htmlToElement(`
        <div id="prettyString">
            <h1>
                ${charArr.map(char => `<span style="display: inline-block; color: ${randomHSL()}; transition: color ${colorDelay}ms ease-in-out">${char}</span>`).join('')}
            </h1>
        </div>`);
};


const animate = async (element, properties = {}, options = {}) => {
    options.duration = (typeof options.duration !== 'undefined') ? options.duration : 1000;
    options.easing = (typeof options.easing !== 'undefined') ? options.easing : 'ease-in-out';
    options.stagger = (typeof options.stagger !== 'undefined') ? options.stagger : 0;
    options.waitForLastAnim = (typeof options.waitForLastAnim !== 'undefined') ? options.waitForLastAnim : false;
    const propKeys = Object.keys(properties);
    const propVals = Object.values(properties);


    let anims = propKeys.map(async (key, idx) => {
        const normalizedKey = key.toLowerCase();
        const currStyle = window.getComputedStyle(element);
        const currentTransform = currStyle.transform
            .match(/\((.*?)\)/)?.[0]
            .replace(/[() ]/g, '')
            .split(',');
        let value = propVals[idx];
        console.log(currStyle.transform);
        switch (normalizedKey) {
            case 'x':
                key = 'transform';
                value = `translate(${value}, ${currentTransform ? currentTransform[5] : 0}px)`;
                break;
            case 'y':
                key = 'transform';
                value = `translate(${currentTransform ? currentTransform[4] : 0}px, ${value})`;
                break;
        }
        // await delay(options.delay);

        let anim = element.animate({[key]: value}, {
            duration: options.duration,
            easing: options.easing,
            delay: options.stagger * idx
        });

        await anim.finished;
        element.style[key] = value;
        return anim;
    });
    await delay(options.delay);

    return {
        args: [properties, options],
    };

};


export { randomBetween, randomColor, randomHSL, prettyString, animate, htmlToElement };
