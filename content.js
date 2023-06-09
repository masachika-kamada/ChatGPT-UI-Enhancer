import { customizePage, observeDOMChanges } from './domUtils.js';
import { createSidebarToggleButton, checkSidebarAndButtonVisibility } from './toggleSidebar.js';
import { toggleChatHistoryTitle, createToggleTitleButton } from './chatHistoryTitle.js';

const currentUrl = window.location.href;

if (!currentUrl.includes("https://chat.openai.com/auth/login")) {
  // Ensure the content script is executed after the page is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      customizePage();
      createSidebarToggleButton();
      observeDOMChanges();
      createToggleTitleButton();
      checkSidebarAndButtonVisibility();
      window.addEventListener('resize', checkSidebarAndButtonVisibility);
    });
  } else {
    customizePage();
    createSidebarToggleButton();
    observeDOMChanges();
    createToggleTitleButton();
    checkSidebarAndButtonVisibility();
    window.addEventListener('resize', checkSidebarAndButtonVisibility);
  }
}

// Add this at the bottom of content.js, after observeDOMChanges()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleChatHistoryTitle') {
    toggleChatHistoryTitle(request.isChecked);
  }
});
