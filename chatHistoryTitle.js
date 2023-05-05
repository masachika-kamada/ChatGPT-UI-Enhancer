const fruitsAndAnimals = [
  'apple', 'banana', 'cherry', 'dog', 'elephant', 'frog', 'grape',
  'hippo', 'iguana', 'jaguar', 'kiwi', 'lemon', 'mango', 'naranja',
  'orange', 'papaya', 'quail', 'rabbit', 'snake', 'tangerine',
  'uguisu', 'vulture', 'walrus', 'xoloitzcuintli', 'yak', 'zebra'
];

let originalTitles = [];
let isTitleHidden = false;

export function toggleChatHistoryTitle() {
  const selector = '#__next div a div';
  let selectedElements = Array.from(document.querySelectorAll(selector));

  // Exclude elements with the 'absolute' class
  selectedElements = excludeElementsByClass(selectedElements, 'absolute');

  // Exclude elements whose parent element has the 'data-state' attribute
  selectedElements = excludeElementsByParentAttribute(selectedElements, 'data-state');

  if (!isTitleHidden) {
    originalTitles = [];
    for (const element of selectedElements) {
      originalTitles.push(element.textContent);
      const randomText = getRandomText();
      element.textContent = randomText;
    }
    isTitleHidden = true;
  } else {
    for (let i = 0; i < selectedElements.length; i++) {
      selectedElements[i].textContent = originalTitles[i];
    }
    isTitleHidden = false;
  }
  return isTitleHidden;
}

function excludeElementsByClass(elements, className) {
  return elements.filter(element => !element.classList.contains(className));
}

function excludeElementsByParentAttribute(elements, attributeName) {
  return elements.filter(element => !element.parentElement.hasAttribute(attributeName));
}

function getRandomText() {
  const randomIndex = Math.floor(Math.random() * fruitsAndAnimals.length);
  return fruitsAndAnimals[randomIndex];
}

export function createToggleTitleButton() {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'toggle_button toggle-chat-history-button';

  const input = document.createElement('input');
  input.id = 'toggleTitle';
  input.className = 'toggle_input';
  input.type = 'checkbox';
  input.addEventListener('change', () => {
    const currentState = toggleChatHistoryTitle();
    input.checked = currentState;
  });

  const label = document.createElement('label');
  label.setAttribute('for', 'toggleTitle');
  label.className = 'toggle_label';

  buttonWrapper.appendChild(input);
  buttonWrapper.appendChild(label);

  document.body.appendChild(buttonWrapper);

  document.addEventListener('sidebarToggled', (e) => {
    buttonWrapper.style.display = e.detail.isVisible ? '' : 'none';
  });

  injectStyles('styles.css');
}

function injectStyles(file) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL(file);
  document.head.appendChild(link);
}
