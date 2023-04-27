import { customizePage, observeDOMChanges } from './domUtils.js';
import { createSidebarToggleButton } from './toggleSidebar.js';
import { toggleChatHistoryTitle } from './chatHistoryTitle.js';

// Ensure the content script is executed after the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    customizePage();
    createSidebarToggleButton();
    observeDOMChanges();
  });
} else {
  customizePage();
  createSidebarToggleButton();
  observeDOMChanges();
}

// Add this at the bottom of content.js, after observeDOMChanges()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleChatHistoryTitle') {
    toggleChatHistoryTitle(request.isChecked);
  }
});
