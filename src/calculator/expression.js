export function append(value) {
  if (this.currentExpression.includes('e')) return;

  this.resetIfOnlyZero(value);
  if (this.currentExpression === '') return this.handleEmptyExpression(value);
  if (this.currentExpression === '-' && value === '-') return;
  if (this.isInvalidAfterPercent(value)) return;

  if (value === '.') return this.handleDot();

  if (this.isLastCharOperator()) {
    this.handleAfterOperator(value);
  } else {
    this.currentExpression += value;
  }
}

export function clear() {
  this.currentExpression = '0';
}

export function deleteLastChar() {
  this.currentExpression = this.currentExpression.slice(0, -1);
  if (this.currentExpression === '') this.currentExpression = '0';
}

export function toggleSign() {
  if (this.currentExpression.includes('e')) return;

  const numberRegex = /(\d+(\.\d*)?%?)$/;
  const nonNumberRegex = /[^0-9.%]/;
  const lastNumberMatch = this.currentExpression.match(numberRegex);

  if (!lastNumberMatch) return;
  const lastNumber = lastNumberMatch[0];
  const index = this.currentExpression.lastIndexOf(lastNumber);

  const charBefore = this.currentExpression[index - 1] || '';
  const charTwoBefore = this.currentExpression[index - 2] || '';

  if (charBefore === '') {
    this.currentExpression =
      this.currentExpression.slice(0, index) + `-${lastNumber}`;
  } else if (charTwoBefore === '') {
    this.currentExpression =
      this.currentExpression.slice(0, index - 1) +
      this.currentExpression.slice(index);
  } else if (
    nonNumberRegex.test(charBefore) &&
    nonNumberRegex.test(charTwoBefore)
  ) {
    this.currentExpression =
      this.currentExpression.slice(0, index - 1) +
      this.currentExpression.slice(index);
  } else if (nonNumberRegex.test(charBefore)) {
    this.currentExpression =
      this.currentExpression.slice(0, index) + `-${lastNumber}`;
  } else {
    this.currentExpression =
      this.currentExpression.slice(0, index) + `-${lastNumber}`;
  }
}

export function percent() {
  if (this.currentExpression.includes('e')) return;
  const numberRegex = /\d+(\.\d*)?%?$/;
  const match = this.currentExpression.match(numberRegex);
  if (!match) return;

  const last = match[0];
  if (last.includes('%')) {
    this.currentExpression = this.currentExpression.replace(/%$/, '');
  } else {
    this.currentExpression += '%';
  }
}
