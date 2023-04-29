import { customizePage, observeDOMChanges } from './domUtils.js';
import { createSidebarToggleButton } from './toggleSidebar.js';
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
    });
  } else {
    customizePage();
    createSidebarToggleButton();
    observeDOMChanges();
    createToggleTitleButton();
  }
}

// Add this at the bottom of content.js, after observeDOMChanges()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleChatHistoryTitle') {
    toggleChatHistoryTitle(request.isChecked);
  }
});
