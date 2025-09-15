export const setupCalculatorControls = (calc, display, previewDisplay) => {
  const updateDisplay = () => {
    display.textContent = calc.currentExpression;
  };

  const decimalPlacesInput = document.getElementById('decimal-places');
  const useExponentialInput = document.getElementById('use-exponential');

  const updateSettings = () => {
    const decimalPlaces = parseInt(decimalPlacesInput.value, 10);
    const useExponential = useExponentialInput.checked;
    calc.setSettings({ decimalPlaces, useExponential });
  };

  decimalPlacesInput.addEventListener('input', updateSettings);
  useExponentialInput.addEventListener('change', updateSettings);
  updateSettings();

  const buttonsContainer = document.querySelector('.buttons');
  let holdTimeout;
  const holdTime = 300;

  buttonsContainer.addEventListener('mousedown', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    if (e.target.textContent === '⌫') {
      holdTimeout = setTimeout(() => {
        calc.clear();
        previewDisplay.textContent = '';
        updateDisplay();
      }, holdTime);
    }
  });

  buttonsContainer.addEventListener('mouseup', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const value = e.target.textContent;
    clearTimeout(holdTimeout);

    switch (value) {
      case '⌫':
        calc.deleteLastChar();
        previewDisplay.textContent = calc.currentExpression;
        break;
      case 'C':
        calc.clear();
        previewDisplay.textContent = '';
        break;
      case '+/-':
        calc.toggleSign();
        previewDisplay.textContent = calc.calculate({ forPreview: true });
        break;
      case '%':
        calc.percent();
        previewDisplay.textContent = calc.calculate({ forPreview: true });
        break;
      case '=':
        calc.calculate();
        previewDisplay.textContent = '';
        break;
      default:
        if (!isNaN(value) || ['+', '-', '×', '÷', '.'].includes(value)) {
          calc.append(value);
          const result = calc.calculate({ forPreview: true });
          previewDisplay.textContent = result ?? '';
        }
        break;
    }
    updateDisplay();
  });

  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key)) {
      calc.append(key);
      previewDisplay.textContent = calc.calculate({ forPreview: true }) ?? '';
    } else if (['+', '-', '*', '/', '.'].includes(key)) {
      calc.append({ '*': '×', '/': '÷' }[key] || key);
    } else if (key === 'Enter' || key === '=') {
      calc.calculate();
      previewDisplay.textContent = '';
    } else if (key === 'Backspace') {
      calc.deleteLastChar();
      previewDisplay.textContent = calc.currentExpression;
    } else if (key === '%') {
      calc.percent();
    } else if (key === 'Escape') {
      calc.clear();
      previewDisplay.textContent = '';
    }
    updateDisplay();
  });
  const settingsModal = document.getElementById('settings-modal');
  const gearButton = document.querySelector('button:first-child');
  const closeButton = document.getElementById('close-settings');
  gearButton.addEventListener('click', () =>
    settingsModal.classList.remove('hidden'),
  );
  closeButton.addEventListener('click', () =>
    settingsModal.classList.add('hidden'),
  );

  updateDisplay();
};
