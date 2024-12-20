import { DarkMode } from './DarkMode';

const bootstrap = () => {
  const toggleButton = document.querySelector(
    '.toggleButton'
  ) as HTMLButtonElement;
  new DarkMode(toggleButton);
};

window.addEventListener('DOMContentLoaded', bootstrap);
