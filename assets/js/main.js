/**
 * Theme Toggle Script
 * - Detects system preference (prefers-color-scheme)
 * - Allows manual toggle
 * - Persists preference in localStorage
 */

(function () {
  "use strict";

  const THEME_KEY = "theme-preference";
  const DARK_THEME = "dark";
  const LIGHT_THEME = "light";

  /**
   * Get the user's preferred theme
   * Priority: localStorage > system preference
   */
  function getPreferredTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }

    // Fall back to system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return DARK_THEME;
    }

    return LIGHT_THEME;
  }

  /**
   * Apply theme to document
   */
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newTheme);
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          // Only update if user hasn't manually set a preference
          if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
          }
        });
    }
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
      toggleButton.addEventListener("click", toggleTheme);
    }
  }

  /**
   * Initialize TOC visibility based on scroll
   * Shows TOC only when the page header is scrolled out of view
   */
  function initTOC() {
    const toc = document.querySelector(".toc");
    const header = document.querySelector(".page-header");

    if (!toc || !header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If header is NOT intersecting (scrolled past), show TOC
          if (!entry.isIntersecting) {
            toc.classList.add("is-visible");
          } else {
            toc.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-50px 0px 0px 0px", // Trigger slightly before it fully disappears
      }
    );

    observer.observe(header);
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTheme();
      initTOC();
      setupEventListeners();
    });
  } else {
    initTheme();
    initTOC();
    setupEventListeners();
  }
})();
