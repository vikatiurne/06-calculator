import { useState } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [inputNum, setInputNum] = useState('');
  const [result, setResult] = useState(0);

  // массив, храняший цифры для клавиш
  const numbers = Array.from({ length: 10 }, (val, key) => key);

  // функция изменения состояния input
  function handlerInput(e) {
    setInputNum(String(e.target.value));
  }
  console.log(inputNum);

  // Функция проверяет последний введенный символ и если это математический оператор, не позволяет ввести еще один оператор (делает замену)

  function fillInput(symbol) {
    const lastSymbol = +inputNum[inputNum.length - 1];
    if (isNaN(lastSymbol)) {
      let string = inputNum.replace(/[-+*/]$/, symbol);
      setInputNum(string);
    } else {
      setInputNum(`${String(inputNum)}${symbol}`);
    }
  }

  // функция получения результата
  function doMath(num1, znak, num2) {
    let x = +num1;
    let y = +num2;
    let math = 0;
    switch (znak) {
      case '+':
        math = x + y;
        break;
      case '-':
        math = x - y;
        break;
      case '*':
        math = x * y;
        break;
      case '/':
        math = x / y;
        break;
      default:
        math = 0;
    }
    setResult(math);
    setInputNum(String(math));
  }

  // функция преобразует строку из input в массив с двумя числами и по индексу определяет математический оператор. Передает эти данные в функцию doMath, где вычисляется результат выражения
  function getResult(e, input) {
    e.preventDefault();
    const index = input.search(/[-+*/]/);
    let nums = input.split(/[-+*/]/);
    // console.log(nums[0], input[index], nums[1]);
    doMath(nums[0], input[index], nums[1]);
  }

  // в функциях +-*/ проверка, разрешающая математические операции только с двумя числами
  function plus(e) {
    e.preventDefault();
    if (
      inputNum.match(/[-+*/]/g) === null ||
      inputNum.match(/[-+*/]/g).length <= 0
    ) {
      fillInput('+');
    }
  }

  function minus(e) {
    e.preventDefault();
    if (
      inputNum.match(/[-+*/]/g) === null ||
      inputNum.match(/[-+*/]/g).length <= 0
    ) {
      fillInput('-');
    }
  }

  function times(e) {
    e.preventDefault();
    if (
      inputNum.match(/[-+*/]/g) === null ||
      inputNum.match(/[-+*/]/g).length <= 0
    ) {
      fillInput('*');
    }
  }

  function divide(e) {
    e.preventDefault();
    if (
      inputNum.match(/[-+*/]/g) === null ||
      inputNum.match(/[-+*/]/g).length <= 0
    ) {
      fillInput('/');
    }
  }

  function resetInput(e) {
    e.preventDefault();
    setInputNum('');
  }

  function resetResult(e) {
    e.preventDefault();
    setResult(0);
  }

  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <p>{result}</p>
        <input
          value={inputNum}
          onChange={handlerInput}
          placeholder="Type a number"
        />

        <div className="panel">
          <div className="numbers">
            {numbers.map((num, i) => (
              <Button
                key={i}
                buttonTitle={num}
                button={(e) => {
                  e.preventDefault();
                  setInputNum(String(inputNum) + String(num));
                }}
              />
            ))}
            <Button buttonTitle="=" button={(e) => getResult(e, inputNum)} />
          </div>
          <div className="active">
            <Button button={plus} buttonTitle="+" />
            <Button button={minus} buttonTitle="-" />
            <Button button={times} buttonTitle="&#215;" />
            <Button button={divide} buttonTitle="&#247;" />
          </div>
        </div>
        <Button button={resetInput} buttonTitle="reset input" />
        <Button button={resetResult} buttonTitle="reset result" />
      </form>
    </div>
  );
}

export default App;
