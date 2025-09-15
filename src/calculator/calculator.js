import * as Expr from './expression.js';
import * as Utils from './utils.js';
import * as Eval from './evaluator.js';

export class Calculator {
  constructor() {
    this.currentExpression = '0';
    this.decimalPlaces = 3;
    this.useExponential = false;
    this.append = Expr.append.bind(this);
    this.clear = Expr.clear.bind(this);
    this.deleteLastChar = Expr.deleteLastChar.bind(this);
    this.toggleSign = Expr.toggleSign.bind(this);
    this.percent = Expr.percent.bind(this);
  }

  setSettings({ decimalPlaces, useExponential }) {
    this.decimalPlaces = decimalPlaces;
    this.useExponential = useExponential;
  }

  resetIfOnlyZero(value) {
    if (
      (this.currentExpression === '0' || this.currentExpression === '-0') &&
      !['.', '+', '×', '÷'].includes(value)
    ) {
      this.currentExpression = '';
    }
  }

  handleEmptyExpression(value) {
    if (value === '-' || !isNaN(value)) {
      this.currentExpression += value;
    }
  }

  isInvalidAfterPercent(value) {
    const lastChar = this.currentExpression.slice(-1);
    return lastChar === '%' && !['+', '-', '×', '÷'].includes(value);
  }

  handleDot() {
    const lastChar = this.currentExpression.slice(-1);
    const numberRegex = /\d+(\.\d*)?$/;
    if (isNaN(lastChar)) {
      this.currentExpression = this.currentExpression.slice(0, -1);
      return;
    }
    const lastNumber = this.currentExpression.match(numberRegex);
    if (lastNumber && lastNumber[0].includes('.')) return;
    this.currentExpression += '.';
  }

  isLastCharOperator() {
    const lastChar = this.currentExpression.slice(-1);
    return ['+', '-', '×', '÷'].includes(lastChar);
  }

  handleAfterOperator(value) {
    const preLastChar = this.currentExpression.slice(-2, -1);

    if (value === '-') {
      if (['-', '×', '÷', '+'].includes(preLastChar)) return;
      this.currentExpression += value;
    } else if (['+', '×', '÷'].includes(value)) {
      return;
    } else {
      this.currentExpression += value;
    }
  }

  round(number) {
    return Utils.round(number, this.decimalPlaces);
  }
  toExponentialFormat(number) {
    return Utils.toExponentialFormat(number, this.decimalPlaces);
  }

  tokenize(expr) {
    return Eval.tokenize(expr);
  }
  evaluate(tokens) {
    return Eval.evaluate(tokens);
  }

  calculate({ forPreview = false } = {}) {
    let result;
    try {
      const tokens = this.tokenize(this.currentExpression);
      result = this.evaluate(tokens);

      if (
        this.useExponential &&
        (result >= 1e10 ||
          result <= -1e10 ||
          (result !== 0 && result < 1e-10 && result > -1e-10))
      ) {
        result = this.toExponentialFormat(result);
      } else {
        result = this.round(result);
      }

      if (!forPreview) this.currentExpression = result.toString();
    } catch {
      if (!forPreview) this.currentExpression = 'Error';
      else result = null;
    }
    return result;
  }
}
