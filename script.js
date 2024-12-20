const output = document.getElementById('output');
const buttons = Array.from(document.getElementsByClassName('button'));
const symbols = ['÷', '×', '-', '+'];
const excluded = ['=', 'AC'];
let firstInputArray = [];
let secondInputArray = [];
let operator = '';


buttons.forEach(button => {
    button.addEventListener('click', () => {

        output.style.fontSize = '60px';

        let input = (operator == '') ? firstInputArray : secondInputArray;

        const value = button.textContent;

        if (value == 'AC') {
            firstInputArray.length = 0;
            secondInputArray.length = 0;
            output.textContent = 0;
            operator = ''
        }

        if (value == '=') {
            if (secondInputArray.length > 0) {
                let result = evaluate(firstInputArray, secondInputArray, operator);
                output.textContent = result;
                if (output.textContent.length > 11) {
                    output.style.fontSize = '34px';
                }
                firstInputArray.length = 0;
                firstInputArray[0] = isNaN(result) ? undefined : result
                secondInputArray.length = 0;
                operator = '';
            }
        }

        if (symbols.includes(value)) {
            if (secondInputArray.length <= 0 && output.textContent != 'Error') {
                operator = value;
                output.textContent = value;
            } return;
        }

        if (excluded.includes(value) ||

            (output.textContent == 0 && value == 0) ||
            (output.textContent.length > 10)) return;

        input.push(value)

        output.textContent = input.length == 0 ? 0 : input.join('');

    }
    )
});

function evaluate(firstArray, secondArray, operator) {
    let firstNumber = parseInt(firstArray.join('')) || 0;
    let secondNumber = parseInt(secondArray.join(''));
    firstArray.length = 0;
    secondArray.length = 0;
    let result;


    switch (operator) {
        case '÷':
            if (secondNumber == 0) {
                result = 'Error';
            } else result = (firstNumber / secondNumber);
            break;
        case '×':
            result = (firstNumber * secondNumber);
            break;
        case '-':
            result = (firstNumber - secondNumber);
            break;
        case '+':
            result = (firstNumber + secondNumber);
            break;
    }

    let cleanResult = (result % 1 !== 0 || !isNaN(result)) ? result : result.toFixed(2);
    return cleanResult;
}