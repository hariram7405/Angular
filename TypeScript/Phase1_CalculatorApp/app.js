"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculate(operator) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultElemet = document.getElementById("result");
    let result;
    if (isNaN(num1) || isNaN(num2)) {
        result = "Please enter valid number in both boxes";
    }
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            result = 0;
    }
    document.getElementById("result").innerText = result.toString();
}
//# sourceMappingURL=app.js.map