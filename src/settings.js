import { colorInputs, updateColors, updateTheme } from './theme.js';

export const saveSettingsToLocalStorage = () => {
  const decimalPlaces = parseInt(
    document.getElementById('decimal-places').value,
    10,
  );
  const useExponential = document.getElementById('use-exponential').checked;

  localStorage.setItem(
    'calculatorSettings',
    JSON.stringify({ decimalPlaces, useExponential }),
  );
  localStorage.setItem(
    'calculatorTheme',
    document.getElementById('theme').value,
  );

  const colorSettings = {};
  Object.keys(colorInputs).forEach((id) => {
    const input = document.getElementById(id);
    if (input) colorSettings[id] = input.value;
  });
  localStorage.setItem('calculatorColors', JSON.stringify(colorSettings));
};

export const loadSettingsFromLocalStorage = (calc) => {
  const savedSettings = JSON.parse(localStorage.getItem('calculatorSettings'));
  if (savedSettings) {
    document.getElementById('decimal-places').value =
      savedSettings.decimalPlaces;
    document.getElementById('use-exponential').checked =
      savedSettings.useExponential;
    calc.setSettings(savedSettings);
  }

  const savedTheme = localStorage.getItem('calculatorTheme');
  if (savedTheme) {
    document.getElementById('theme').value = savedTheme;
    updateTheme();
  }

  const savedColors = JSON.parse(localStorage.getItem('calculatorColors'));
  if (savedColors) {
    Object.keys(savedColors).forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = savedColors[id];
    });
    updateColors();
  }
};
