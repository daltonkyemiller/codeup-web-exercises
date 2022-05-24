const CalcBtns = {
    CLEAR: { vals: ['c'], type: 'func' },
    MODULUS: { vals: ['%'], type: 'func' },
    DIVIDE: { vals: ['/'], type: 'func' },
    EQUALS: { vals: ['='], type: 'func' },
    DECIMAL: { vals: ['.'], type: 'func' },
    ADD: { vals: ['+'], type: 'func' },
    SUBTRACT: { vals: ['-'], type: 'func' },
    MULTIPLY: { vals: ['*', 'x'], type: 'func' },
    OPEN_PARENTHESES: { vals: ['('], type: 'func' },
    CLOSED_PARENTHESES: { vals: [')'], type: 'func' },
    ZERO: { vals: ['0'], type: 'num' },
    ONE: { vals: ['1'], type: 'num' },
    TWO: { vals: ['2'], type: 'num' },
    THREE: { vals: ['3'], type: 'num' },
    FOUR: { vals: ['4'], type: 'num' },
    FIVE: { vals: ['5'], type: 'num' },
    SIX: { vals: ['6'], type: 'num' },
    SEVEN: { vals: ['7'], type: 'num' },
    EIGHT: { vals: ['8'], type: 'num' },
    NINE: { vals: ['9'], type: 'num' },
};


const handleCalcButtonClick = (e) => {
    const targetText = e.target.innerText.toLowerCase();
    const result = e.target.parentNode.parentNode.querySelector('.display > .result');
    const calcButtonKey = Object.keys(CalcBtns).filter(key => CalcBtns[key].vals.includes(targetText))[0];
    const calcButton = CalcBtns[calcButtonKey];

    if (Object.is(calcButton, CalcBtns.CLEAR)) return result.value = '';
    if (Object.is(calcButton, CalcBtns.EQUALS)) return result.value = eval(result.value);


    result.value += targetText;
};

const handleTypeIntoResult = (e) => {
    const key = e.key.toLowerCase();
    if (CalcBtns.CLEAR.vals.includes(key)) return e.target.value = '';

    const allowedChars = Object.values(CalcBtns).map(button => button.vals).flat();
    if (!allowedChars.includes(key)) e.target.value = e.target.value.replaceAll(key, '');
    if (key === 'enter') {
        try {
            const result = eval(e.target.value);
            console.log(result);
            e.target.value = result;
        } catch (error) {
            e.target.value = 'ERROR';
        }
    }
};

const calcButtons = document.querySelectorAll('.button');
const calcResults = document.querySelectorAll('.display > .result');

for (const result of calcResults) {
    result.addEventListener('keyup', handleTypeIntoResult);
}
for (const button of calcButtons) {
    button.addEventListener('click', handleCalcButtonClick);
}