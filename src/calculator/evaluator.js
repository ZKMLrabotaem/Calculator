function applyPercentOperation(
  left,
  operator,
  right,
  isLeftPercent,
  isRightPercent,
) {
  const l = isLeftPercent ? left / 100 : left;
  const r = isRightPercent ? right / 100 : right;

  switch (operator) {
    case '+':
      return isRightPercent ? l + l * r : l + r;
    case '-':
      return isRightPercent ? l - l * r : l - r;
    case '×':
      return l * r;
    case '÷':
      if (r === 0) throw new Error('Деление на ноль');
      return l / r;
    default:
      throw new Error(`Unexpected operator: ${operator}`);
  }
}

export function tokenize(expression) {
  const percentPatterns = [
    {
      regex: /(-?\d+(\.\d*)?)%\s*([+\-×÷])\s*(-?\d+(\.\d*)?)%/,
      leftPercent: true,
      rightPercent: true,
    },
    {
      regex: /(-?\d+(\.\d*)?)\s*([+\-×÷])\s*(-?\d+(\.\d*)?)%/,
      leftPercent: false,
      rightPercent: true,
    },
    {
      regex: /(-?\d+(\.\d*)?)%\s*([+\-×÷])\s*(-?\d+(\.\d*)?)/,
      leftPercent: true,
      rightPercent: false,
    },
  ];

  for (const { regex, leftPercent, rightPercent } of percentPatterns) {
    let match;
    while ((match = regex.exec(expression))) {
      const left = parseFloat(match[1]);
      const operator = match[3];
      const right = parseFloat(match[4]);

      const replacementValue = applyPercentOperation(
        left,
        operator,
        right,
        leftPercent,
        rightPercent,
      );
      expression = expression.replace(match[0], replacementValue);
    }
  }

  const tokens = [];
  let numberBuffer = '';
  let expectNegative = true;

  for (let char of expression) {
    if (!isNaN(char) || char === '.') {
      numberBuffer += char;
      expectNegative = false;
    } else if (char === '-' && expectNegative) {
      numberBuffer += char;
    } else {
      if (numberBuffer) {
        tokens.push(parseFloat(numberBuffer));
        numberBuffer = '';
      }
      if (['+', '-', '×', '÷'].includes(char)) {
        tokens.push(char);
      }
      expectNegative = char === '-' || ['+', '-', '×', '÷'].includes(char);
    }
  }

  if (numberBuffer) tokens.push(parseFloat(numberBuffer));
  if (tokens.length && ['+', '-', '×', '÷'].includes(tokens[tokens.length - 1]))
    tokens.pop();

  return tokens;
}

export function evaluate(tokens) {
  const highPriority = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '×' || tokens[i] === '÷') {
      const left = highPriority.pop();
      const right = tokens[++i];
      const result =
        tokens[i - 1] === '×'
          ? left * right
          : right === 0
            ? (() => {
                throw new Error('Деление на ноль');
              })()
            : left / right;
      highPriority.push(result);
    } else {
      highPriority.push(tokens[i]);
    }
  }

  let result = highPriority[0];
  for (let i = 1; i < highPriority.length; i += 2) {
    const operator = highPriority[i];
    const value = highPriority[i + 1];
    result = operator === '+' ? result + value : result - value;
  }

  return result;
}
