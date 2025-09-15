export const colorInputs = {
  'bg-color': '--bg-color',
  'button-color': '--button-color',
  'button-hover-color': '--button-hover-color',
  'button-text-color': '--button-text-color',
  'display-bg-color': '--display-bg-color',
  'display-text-color': '--display-text-color',
};
const defaultThemes = {
  white: {
    '--bg-color': '#f5f5f5',
    '--button-color': '#ffffff',
    '--button-hover-color': '#f0f0f0',
    '--button-text-color': '#000000',
    '--display-bg-color': '#222222',
    '--display-text-color': '#ffffff',
    '--modal-bg-color': '#f5f5f5',
    '--modal-text-color': '#000000',
    '--modal-button-color': '#ffffff',
    '--modal-button-hover-color': '#f0f0f0',
    '--modal-button-text-color': '#000000',
    '--input-bg-color': '#ffffff',
    '--input-text-color': '#000000',
    '--select-bg-color': '#ffffff',
    '--select-text-color': '#000000',
  },
  dark: {
    '--bg-color': '#333333',
    '--button-color': '#444444',
    '--button-hover-color': '#555555',
    '--button-text-color': '#ffffff',
    '--display-bg-color': '#000000',
    '--display-text-color': '#ffffff',
    '--modal-bg-color': '#333333',
    '--modal-text-color': '#f5f5f5',
    '--modal-button-color': '#333333',
    '--modal-button-hover-color': '#555555',
    '--modal-button-text-color': '#ffffff',
    '--input-bg-color': '#444444',
    '--input-text-color': '#ffffff',
    '--select-bg-color': '#444444',
    '--select-text-color': '#ffffff',
  },
};
export const setThemeColors = (colors) => {
  Object.keys(colors).forEach((colorVar) => {
    document.documentElement.style.setProperty(colorVar, colors[colorVar]);
  });

  Object.keys(colorInputs).forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.value = colors[colorInputs[id]] ?? input.value;
  });
};

export const updateTheme = () => {
  const theme = document.getElementById('theme').value;
  document.body.classList.remove('white-theme', 'dark-theme');
  document.body.classList.add(theme === 'white' ? 'white-theme' : 'dark-theme');

  setThemeColors(defaultThemes[theme]);
};

export const updateColors = () => {
  Object.keys(colorInputs).forEach((id) => {
    const input = document.getElementById(id);
    const colorVar = colorInputs[id];
    if (input)
      document.documentElement.style.setProperty(colorVar, input.value);
  });
};
