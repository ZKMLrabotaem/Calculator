import './style.css';
import { Calculator } from './calculator/calculator';
import { setupCalculatorControls } from './keys.js';
import { colorInputs, updateColors, updateTheme } from './theme.js';
import {
  saveSettingsToLocalStorage,
  loadSettingsFromLocalStorage,
} from './settings.js';

const calc = new Calculator();
const display = document.querySelector('.display');
const previewDisplay = document.querySelector('.preview-display');

setupCalculatorControls(calc, display, previewDisplay);

window.addEventListener('load', () => {
  loadSettingsFromLocalStorage(calc);
});

['decimal-places', 'use-exponential', 'theme'].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => {
    if (id === 'theme') {
      updateTheme();
      updateColors();
    }
    saveSettingsToLocalStorage();
  });
});

Object.keys(colorInputs).forEach((id) => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', () => {
    updateColors();
    saveSettingsToLocalStorage();
  });
});
