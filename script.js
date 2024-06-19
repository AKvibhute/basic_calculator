// Function to append value to the display
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to clear all (display and history)
function allClear() {
    clearDisplay();
    localStorage.removeItem('history');
}

// Function to remove the last character from the display
function back() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Custom square root function using the Newton-Raphson method
function root(number) {
    if (number < 0) return NaN;
    let x = number;
    let y = 1.0;
    const e = 0.000001; // precision level
    while (x - y > e) {
        x = (x + y) / 2;
        y = number / x;
    }
    return x;
}

// Function to evaluate the expression
function calculate() {
    let expression = document.getElementById('display').value;

    try {
        // Replace √ followed by a number with customSqrt function call
        expression = expression.replace(/√(\d+(\.\d+)?)/g, (match, p1) => `root(${p1})`);

        // Replace ^ with **
        expression = expression.replace(/\^/g, '**');

        // for percentage %
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => `(${p1}/100)`);

        // Check for division by zero
        if (expression.includes('/0')) {
            throw new Error("Division by zero");
        }

        // Evaluate the expression
        const result = eval(expression);
        document.getElementById('display').value = result;

        // Save to history
        saveToHistory(expression + " = " + result);
    } catch (error) {
        // Handle errors
        document.getElementById('display').value = 'Error';
    }
}

// Function to save calculation to history
function saveToHistory(entry) {
    const displayValue = document.getElementById('display').value;
    if (!displayValue.startsWith('Error')) {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(entry);
        localStorage.setItem('history', JSON.stringify(history));
    }
}

// Function to show history
function showHistory() {
    document.getElementById('historyPopup').classList.add('open');
    const historyContent = document.getElementById('historyContent');
    const history = JSON.parse(localStorage.getItem('history')) || [];
    historyContent.innerHTML = history.map(item => `<p>${item}</p>`).join('');
}

// Function to close history popup
function closeHistory() {
    document.getElementById('historyPopup').classList.remove('open');
}

// Event listener for keydown events
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const allowedKeys = '0123456789+-*/.()√^';

    if (allowedKeys.includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        back();
    }
});

function togglePopup() {
    const popup = document.getElementById('B-Popup');
    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}
