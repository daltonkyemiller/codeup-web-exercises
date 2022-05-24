const CALC_OPERATORS = {
    CLEAR: ['c'],
    MODULUS: ['%'],
    DIVIDE: ['/'],
    EQUALS: ['='],
    ADD: ['+'],
    SUBTRACT: ['-'],
    MULTIPLY: ['*', 'x'],
};
const CALC_NUMBERS = {
    ZERO: ['0'],
    ONE: ['1'],
    TWO: ['2'],
    THREE: ['3'],
    FOUR: ['4'],
    FIVE: ['5'],
    SIX: ['6'],
    SEVEN: ['7'],
    EIGHT: ['8'],
    NINE: ['9'],
    DECIMAL: ['.'],

};

const CALC_INPUTS = {
    ...CALC_OPERATORS,
    ...CALC_NUMBERS
};

const changeResult = (calculator, changeTo) => {
    const result = calculator.querySelector('.result');

    try {
        if (CALC_OPERATORS.EQUALS.includes(changeTo)) return result.value = eval(result.value);
        if (CALC_OPERATORS.CLEAR.includes(changeTo)) return result.value = '';
        if (Object.values(CALC_OPERATORS).flat().includes(changeTo)) return result.value += ` ${changeTo} `;
        if (Object.values(CALC_NUMBERS).flat().includes(changeTo)) return result.value += changeTo;
    } catch (error) {
        result.value = 'ERROR';
    }

};


const calcButtons = document.querySelectorAll('.button');
const calcResults = document.querySelectorAll('.display > .result');

let meta = false;
const handleInputKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'meta') meta = true;
    if (key !== 'backspace' && (!meta)) e.preventDefault();
    changeResult(e.target.parentNode.parentNode, key === 'enter' ? '=' : key);
};
const handleButtonClick = (e) => {
    changeResult(e.target.parentNode.parentNode, e.target.innerText.toLowerCase());
};

const handleInputKeyUp = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'meta') meta = false;
};


for (const result of calcResults) {
    result.addEventListener('keydown', handleInputKeyDown);
    result.addEventListener('keyup', handleInputKeyUp);
}
for (const button of calcButtons) {
    button.addEventListener('click', handleButtonClick);
}