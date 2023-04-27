document.getElementById('toggleTitle').addEventListener('change', (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'toggleChatHistoryTitle',
      isChecked: event.target.checked
    });
  });
});
