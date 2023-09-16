window.addEventListener('DOMContentLoaded', init);

const btnOptions = ['7', '8', '9', '⬅', '4', '5', '6', 'x', '1', '2', '3', '÷', '.', '0', '+', '-', '√', 'C', '=']; // all keys
const specKeys = ['x', '÷', '+', '-']; //special function keys



function init() {
    document.title = 'Basic Calculator';
    console.log('ready');
    let decPoint = false;
    let eva = false;
    let calculationMade = false;


    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);

    const output = document.createElement('input');
    output.setAttribute('type', 'text');
    output.classList.add('output');
    container.appendChild(output);

    const main = document.createElement('div');
    main.classList.add('main');
    container.appendChild(main);

    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerText = 'www.devildog.co.za'
    document.body.appendChild(footer);


    btnOptions.forEach(function (val) {
        // console.log(val);
        btnMaker(val, addOutput);
    });

    // btnMaker('=', evalOutput);
    // btnMaker('C', clrOutput);
    // btnMaker('⌫', backspace);
    // Add the square root button
    // btnMaker('√', sqrt);


    function cOutput(v) {
        output.style.border = v + '1px solid #f48c06';
        output.style.color = v;
    }

    function backspace() {
        cOutput('#03071eb0');
        let currentValue = output.value;
        output.value = currentValue.slice(0, -1); // Remove the last character
        calculationMade = false; // Reset the calculation flag
    }

    function sqrt() {
        cOutput('#03071eb0');
        let value = output.value;
        if (value === "") {
            return;
        }
        output.value = Math.sqrt(value);
        decPoint = output.value.includes('.');
    }

    function evalOutput() {
        cOutput('#03071eb0');
        // console.log('=');
        if (output.value === "") {
            cOutput('#d00000');
        } else if (eva) {
            cOutput('#d00000');
        }
        else try {
            // Replace 'X' with '*' and '÷' with '/' before evaluating
            const expression = output.value.replace(/x/g, '*').replace(/÷/g, '/');
            const result = Function(`'use strict'; return ${expression}`)();
            // console.log(result);
            output.value = result;
            calculationMade = true; // Set the flag to true after the calculation
        } catch (error) {
            // Handle any errors that may occur during evaluation
            output.value = 'Error';
        }
        decPoint = output.value.includes('.');
    }

    function clrOutput() {
        cOutput('#03071eb0');
        output.value = "";
        calculationMade = false;
    }

    function btnMaker(txt, myFunction) {
        let btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.classList.add('button');
        btn.val = txt;
        btn.textContent = txt;
        btn.addEventListener('click', myFunction);
        main.appendChild(btn);
    }


    function addOutput(e) {
        // console.log(decPoint);
        cOutput('#03071eb0');
        // console.log(e.target.val);

        let char = e.target.val;

        if (calculationMade) {
            output.value = ""; // Clear the output when a new calculation starts
            calculationMade = false;
        }


        if (char === '⬅') {
            backspace(); // Call the backspace function
            return;
        }

        // Check if the current input is an operator and there are no digits in the output
        if (specKeys.includes(char) && output.value === "") {
            return; // Don't add the operator if there are no digits
        }


        if (char === '√') {
            sqrt(); //call the square root function
            return;
        }

        if (char === 'C') {
            clrOutput(); //call the clear output function
            return;
        }

        if (char === '=') {
            evalOutput(); //call the evaluate function
            return;
        }

        if (output.value.length >= 12) {
            return; //only allow 10 characters in the input window
        }

        //decimal point evaluation

        if (char == '.') {
            if (decPoint) {
                char = '';
                cOutput('#d00000');
            }
            else {
                decPoint = true;
            }
        }
        eva = specKeys.includes(char);
        if (eva) {
            decPoint = false;
        }


        output.value += char; //updates the output area
    }
}

