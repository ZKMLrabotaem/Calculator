export function customAbs(number) {
  return number < 0 ? -number : number;
}

export function round(number, decimalPlaces) {
  let [intPart, decPart] = number.toString().split('.');
  if (!decPart) return number;
  decPart = decPart.slice(0, decimalPlaces);
  return parseFloat(`${intPart}.${decPart}`);
}

export function toExponentialFormat(number, decimalPlaces) {
  if (number === 0) return '0';

  const isNegative = number < 0;
  let absNumber = customAbs(number);
  let exponent = 0;

  while (absNumber >= 10) {
    absNumber /= 10;
    exponent++;
  }
  while (absNumber < 1 && absNumber > 0) {
    absNumber *= 10;
    exponent--;
  }

  absNumber = round(absNumber, decimalPlaces);
  let result = absNumber.toString();

  if (result.includes('.')) {
    const decimalIndex = result.indexOf('.');
    result = result.slice(0, decimalIndex + decimalPlaces + 1);
    result = result.replace(/\.?0+$/, '');
  }

  if (result.endsWith('.')) result = result.slice(0, -1);
  result += 'e' + (exponent >= 0 ? '+' : '') + exponent;
  if (isNegative) result = '-' + result;

  return result;
}
