export class DarkMode {
  private readonly el: HTMLButtonElement;
  private readonly lightIcon: HTMLElement;
  private readonly darkIcon: HTMLElement;
  private darkMode: boolean;
  private mediaQuery: MediaQueryList;

  constructor(el: HTMLButtonElement) {
    this.el = el;
    this.lightIcon = this.el.querySelector('#lightIcon') as HTMLElement;
    this.darkIcon = this.el.querySelector('#darkIcon') as HTMLElement;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Bind methods
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.handleSystemPreferenceChange =
      this.handleSystemPreferenceChange.bind(this);

    const savedDarkMode = localStorage.getItem('darkMode');
    this.darkMode =
      savedDarkMode !== null
        ? JSON.parse(savedDarkMode)
        : this.mediaQuery.matches;
    // Initial setup
    this.init();
  }

  private applyDarkModeClasses(): void {
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  private toggleIcons(): void {
    this.darkIcon.classList.toggle('hide', this.darkMode);
    this.lightIcon.classList.toggle('hide', !this.darkMode);
  }

  // Apply dark mode classes and update icons
  private updateUI(): void {
    this.applyDarkModeClasses();
    this.toggleIcons();
  }

  // Toggle dark mode state and update UI
  private toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.updateUI();
    this.saveCurrentMode();
  }

  // Save the current dark mode state to localStorage
  private saveCurrentMode(): void {
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  // Handle changes in system dark mode preferences
  private handleSystemPreferenceChange(e: MediaQueryListEvent): void {
    this.darkMode = e.matches;
    this.updateUI();
    this.saveCurrentMode();
  }

  // Register the button click event listener
  private registerEventListeners(): void {
    this.el.addEventListener('click', this.toggleDarkMode);
    this.mediaQuery.addEventListener(
      'change',
      this.handleSystemPreferenceChange
    );
  }

  // Remove the button click event listener
  private removeEventListeners(): void {
    this.el.removeEventListener('click', this.toggleDarkMode);
    this.mediaQuery.removeEventListener(
      'change',
      this.handleSystemPreferenceChange
    );
  }

  // Initialize the component
  private init(): void {
    this.updateUI();
    this.registerEventListeners();
    this.saveCurrentMode();
  }

  // Cleanup the component
  public destroy(): void {
    this.removeEventListeners();
  }
}
