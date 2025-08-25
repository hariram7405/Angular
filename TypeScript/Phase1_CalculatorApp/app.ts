function calculate(operator: string): void {
  const num1 = parseFloat((document.getElementById("num1") as HTMLInputElement).value);
  const num2 = parseFloat((document.getElementById("num2") as HTMLInputElement).value);
  const resultElemet=document.getElementById("result") as HTMLInputElement;
  let result: string | number;
  if(isNaN(num1)||isNaN(num2)){
    result="Please enter valid number in both boxes";
    
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

  (document.getElementById("result") as HTMLElement).innerText = result.toString();
}
