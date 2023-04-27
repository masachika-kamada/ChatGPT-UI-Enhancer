function customizePage() {
  // Change the text using a CSS selector
  const changeTextSelector = 'button[id^="headlessui-menu-button"] > div:nth-child(2)';
  const changeTextNode = document.querySelector(changeTextSelector);
  if (changeTextNode) {
    changeTextNode.textContent = 'USER';
  }

  // Remove content using the specified XPath
  const removeContentXPath = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/div';
  const removeContentNode = document.evaluate(removeContentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (removeContentNode) {
    removeContentNode.innerHTML = '';
  }

  // Change the width and center-align the target element
  const targetElement = document.querySelector('.absolute.bottom-0.left-0.w-full');
  if (targetElement) {
    targetElement.style.width = 'calc(100% - 1rem)';  // 1rem のスクロールバー分を引いている
  }
}

function toggleTabVisibility() {
  const tabXPath = '//*[@id="__next"]/div[2]/div[1]';
  const tabNode = document.evaluate(tabXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (tabNode) {
    tabNode.style.display = (tabNode.style.display === 'none') ? '' : 'none';
  }
}

function createToggleButton() {
  const button = document.createElement('button');
  button.classList.add('toggle-tab-button');
  button.style.left = '260px';

  const arrow = document.createElement('div');
  arrow.classList.add('toggle-tab-arrow');

  button.appendChild(arrow);

  button.addEventListener('click', () => {
    toggleTabVisibility();
    if (button.style.left === '260px') {
      button.style.left = '0px';
      arrow.style.transform = 'translate(-50%, -50%) scaleX(1)';
    } else {
      button.style.left = '260px';
      arrow.style.transform = 'translate(-50%, -50%) scaleX(-1)';
    }
  });

  document.body.appendChild(button);
}

function observeDOMChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        customizePage();
      }
    }
  });

  observer.observe(targetNode, config);
}

// Ensure the content script is executed after the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    customizePage();
    createToggleButton();
    observeDOMChanges();
  });
} else {
  customizePage();
  createToggleButton();
  observeDOMChanges();
}

// Add this at the top of content.js
let originalTitles = [];
let isTitleHidden = false;

// Add this list of fruits and animals at the top of content.js
const fruitsAndAnimals = [
  'apple', 'banana', 'cherry', 'dog', 'elephant', 'frog', 'grape',
  'hippo', 'iguana', 'jaguar', 'kiwi', 'lemon', 'mango', 'naranja',
  'orange', 'papaya', 'quail', 'rabbit', 'snake', 'tangerine',
  'uguisu', 'vulture', 'walrus', 'xoloitzcuintli', 'yak', 'zebra'
];

// Modify the toggleChatHistoryTitle function in content.js
function toggleChatHistoryTitle(isChecked) {
  const titleBaseXPath = '//*[@id="__next"]/div[2]/div[1]/div/div/nav/div[2]/div/div/a';
  const titleNodesSnapshot = document.evaluate(titleBaseXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  if (isChecked) {
    if (!isTitleHidden) {
      originalTitles = [];
      for (let i = 0; i < titleNodesSnapshot.snapshotLength; i++) {
        const titleNode = titleNodesSnapshot.snapshotItem(i);
        const childDivNodes = titleNode.querySelectorAll('div');

        if (childDivNodes.length > 1) {
          const node = childDivNodes[0];
          originalTitles.push(node.textContent);
          const randomFruitOrAnimal = fruitsAndAnimals[Math.floor(Math.random() * fruitsAndAnimals.length)];
          node.textContent = randomFruitOrAnimal;
        } else {
          const node = childDivNodes[0];
          originalTitles.push(node.textContent);
          const randomFruitOrAnimal = fruitsAndAnimals[Math.floor(Math.random() * fruitsAndAnimals.length)];
          node.textContent = randomFruitOrAnimal;
        }
      }
      isTitleHidden = true;
    }
  } else {
    if (isTitleHidden) {
      let titleIndex = 0;
      for (let i = 0; i < titleNodesSnapshot.snapshotLength; i++) {
        const titleNode = titleNodesSnapshot.snapshotItem(i);
        const childDivNodes = titleNode.querySelectorAll('div');

        if (childDivNodes.length > 1) {
          const node = childDivNodes[0];
          node.textContent = originalTitles[titleIndex];
        } else {
          const node = childDivNodes[0];
          node.textContent = originalTitles[titleIndex];
        }
        titleIndex++;
      }
      isTitleHidden = false;
    }
  }
}

// Add this at the bottom of content.js, after observeDOMChanges()
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleChatHistoryTitle') {
    toggleChatHistoryTitle(request.isChecked);
  }
});
